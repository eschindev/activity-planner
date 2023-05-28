const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
  },
});

const Request = model("request", requestSchema);

module.exports = Request;
