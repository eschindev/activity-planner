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
