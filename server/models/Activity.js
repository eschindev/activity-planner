const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
// const { User, Invite } = require("./index");
const User = require("./User");
const Invite = require("./Invite");

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
  },
  locaton: {
    type: String,
    required: true,
    trim: true,
  },
  private: {
    type: Boolean,
    default: true,
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

activitySchema.pre(
  "findOneAndDelete",
  { document: true },
  async function (next) {
    const participantIds = this.participants.map((userId) => userId.toString());
    const inviteIds = this.invites.map((inviteId) => inviteId.toString());

    await User.updateMany(
      { _id: { $in: participantIds } },
      { $pull: { activities: this._id } }
    );

    for (inviteId of inviteIds) {
      await Invite.findByIdAndDelete(inviteId);
    }

    next();
  }
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
