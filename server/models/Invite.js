const { Schema, model } = require("mongoose");
const { User, Activity } = require("./index");

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
    enum: ["pending", "accepted", "rejected", "maybe"],
    default: "pending",
  },
});

inviteSchema.post("create", async function (doc) {
  await User.findByIdAndUpdate(doc.recipient, {
    $addToSet: { invites: doc._id },
  });

  await Activity.findByIdAndUpdate(doc.activity, {
    $addToSet: { invites: doc.id },
  });
});

inviteSchema.pre("findOneAndDelete", { document: true }, async function (next) {
  await User.findByIdAndUpdate(this.recipient, {
    $pull: { invites: this._id },
  });

  await Activity.findByIdAndUpdate(this.activity, {
    $pull: { invites: this._id },
  });

  next();
});

const Invite = model("Invite", inviteSchema);

module.exports = Invite;
