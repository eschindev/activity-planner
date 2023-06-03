const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");

const activitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    set: function (value) {
      return new Date(value);
    },
    get: function (value) {
      return value.toISOString();
    },
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  private: {
    type: Boolean,
    default: true,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  invites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invite",
    },
  ],
  comments: [commentSchema],
});

// activitySchema.statics.bulkWrite = async function (operations) {
//   const collection = this.collection;
//   return collection.bulkWrite(operations);
// };

activitySchema.post("save", async function (doc, next) {
  model("User").findByIdAndUpdate(doc.owner, {
    $addToSet: { activities: doc._id },
  });

  next();
});

activitySchema.pre(
  "findOneAndDelete",
  { document: true },
  async function (next) {
    const participantIds = this.participants.map((userId) => userId.toString());
    const inviteIds = this.invites.map((inviteId) => inviteId.toString());

    await model("User").updateMany(
      { _id: { $in: participantIds } },
      { $pull: { activities: this._id } }
    );

    for (inviteId of inviteIds) {
      await model("Invite").findByIdAndDelete(inviteId);
    }

    next();
  }
);

activitySchema.index({ name: "text", description: "text" });

const Activity = model("Activity", activitySchema);

module.exports = Activity;
