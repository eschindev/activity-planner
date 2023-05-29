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
    enum: ["pending", "accepted", "rejected", "maybe"],
    default: "pending",
  },
});

const Invite = model("Invite", inviteSchema);

module.exports = Invite;
