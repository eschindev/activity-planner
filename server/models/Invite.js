const { Schema, model } = require("mongoose");

const inviteSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "maybe"],
    default: "pending",
  },
});

inviteSchema.post("save", async function (doc) {
  await model("User").findByIdAndUpdate(doc.recipient, {
    $addToSet: { invites: doc._id },
  });

  await model("Activity").findByIdAndUpdate(doc.activity, {
    $addToSet: { invites: doc.id },
  });
});

inviteSchema.post("findOneAndUpdate", async function (doc) {
  if (this._update["$set"].status === "accepted") {
    await model("Activity").findByIdAndUpdate(doc.activity, {
      $addToSet: { participants: doc.recipient },
    });
    await model("User").findByIdAndUpdate(doc.recipient, {
      $addToSet: { activities: doc.activity },
    });
  } else if (this._update["$set"].status === "declined") {
    await model("Activity").findByIdAndUpdate(doc.activity, {
      $pull: { participants: doc.recipient },
    });
    await model("User").findByIdAndUpdate(doc.recipient, {
      $pull: { activities: doc.activity },
    });
  }
});

inviteSchema.pre("findOneAndDelete", { document: true }, async function (next) {
  await model("User").findByIdAndUpdate(this.recipient, {
    $pull: { invites: this._id },
  });

  await model("Activity").findByIdAndUpdate(this.activity, {
    $pull: { invites: this._id },
  });

  next();
});

inviteSchema.pre("deleteMany", async function (next) {
  const deletedInvites = await this.model.find(this.getFilter());
  const userUpdateOperations = deletedInvites.map((invite) => {
    return {
      updateOne: {
        filter: { _id: invite.recipient },
        update: { $pull: { invites: invite._id } },
      },
    };
  });
  const activityUpdateOperations = deletedInvites.map((invite) => {
    return {
      updateOne: {
        filter: { _id: invite.activity },
        update: { $pull: { invites: invite._id } },
      },
    };
  });

  await model("User").bulkWrite(userUpdateOperations);
  await model("Activity").bulkWrite(activityUpdateOperations);

  next();
});

const Invite = model("Invite", inviteSchema);

module.exports = Invite;
