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

requestSchema.post("save", async function (doc) {
  await User.findByIdAndUpdate(doc.recipient, {
    $addToSet: { requests: doc._id },
  });
});

requestSchema.post("findOneAndUpdate", async function (doc) {
  if (this._update.status === "accepted") {
    await User.findByIdAndUpdate(doc.sender, {
      $addToSet: { friends: doc.recipient },
    });
    await User.findByIdAndUpdate(doc.recipient, {
      $addToSet: { friends: doc.sender },
    });
  }
  // pre-delete hook to remove request ID from recipient's requests array
  await Request.findByIdAndDelete(doc._id);
});

requestSchema.pre(
  "findOneAndDelete",
  { document: true },
  async function (next) {
    await User.findByIdAndUpdate(this.recipient, {
      $pull: { requests: this._id },
    });

    next();
  }
);

requestSchema.pre("deleteMany", async function (next) {
  const deletedRequests = await this.model.find(this.getFilter());
  const updateOperations = deletedRequests.map((request) => {
    return {
      updateOne: {
        filter: { _id: request.recipient },
        update: { $pull: { requests: request._id } },
      },
    };
  });

  await User.bulkWrite(updateOperations);

  next();
});

const Request = model("Request", requestSchema);

module.exports = Request;
