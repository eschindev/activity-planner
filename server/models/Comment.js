const { Schema, Types } = require("mongoose");
const dayjs = require("dayjs");
// const dateFormat = (timestamp) => {
//   let day = dayjs(timestamp);
//   return day.format("MM/DD/YYYY");
// };

const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  commentBody: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    // default: dateFormat(Date.now()),
    default: new Date().toISOString(),
  },
});

module.exports = commentSchema;
