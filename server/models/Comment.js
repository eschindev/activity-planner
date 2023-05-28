const { Schema, Types } = require("mongoose");

const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  commentBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = commentSchema;
