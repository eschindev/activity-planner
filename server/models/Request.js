const { Schema, model } = require("mongoose");
const User = require("./User");

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
    default: "pending",
  },
});

requestSchema.post("create", async function (doc) {
  await User.findByIdAndUpdate(doc.recipient, {
    $addToSet: { requests: doc._id },
  });
});

requestSchema.pre(
  "findOneAndDelete",
  { document: true },
  async function (next) {
    await User.findByIdAndUpdate(this.recipient, {
      $pull: { requests: this._id },
    });
  }
);

const Request = model("Request", requestSchema);

module.exports = Request;
