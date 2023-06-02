const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  invites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invite",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  if (this.isNew() || this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  }
  return next();
});

userSchema.pre("findOneAndDelete", { document: true }, async function (next) {
  const friendIds = this.friends.map((userId) => userId.toString());
  await User.updateMany(
    { _id: { $in: friendIds } },
    { $pull: { friends: this._id } }
  );
  console.log("User pre-findOneAndDelete removed deleted User from friends");
  const activityIds = this.activities.map((activityId) =>
    activityId.toString()
  );
  await Activity.updateMany(
    { _id: { $in: activityIds } },
    { $pull: { participants: this._id } }
  );
  console.log("User pre-findOneAndDelete removed deleted User from activities");
  await Invite.deleteMany({
    $or: [{ sender: this._id }, { recipient: this._id }],
  });
  console.log("User pre-findOneAndDelete deleted associated invites");
  await Request.deleteMany({
    $or: [{ sender: this._id }, { recipient: this._id }],
  });
  console.log("User pre-findOneAndDelete deleted associated requests");
  next();
});

userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.index({ username: "text", fullName: "text" });

const User = model("User", userSchema);

module.exports = User;
