const { User } = require("../../models");
const { signToken } = require("../../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { isAuthenticated } = require("../../utils/auth");

const resolvers = {
  Query: {
    getAllUsers: async (_, __, context) => {
      isAuthenticated(context, "You must be logged in to view other users.");
      const users = await User.find();
      return users;
    },

    // getUserById: async (_, { _id }, context) => {
    //   isAuthenticated(context, "You must be logged in to view other users.");
    //   const user = await User.findById(_id);
    //   return user;
    // },

    getUserById: async (_, { _id }, context) => {
      // previously getFullUserById
      isAuthenticated(context, "You must be logged in to view user profiles.");
      const user = await User.findById(_id)
        .populate("friends")
        .populate("activities");
      return user;
    },

    getUserByUsername: async (_, { username }, context) => {
      // previously getFullUserById
      isAuthenticated(context, "You must be logged in to view user profiles.");
      const user = await User.findOne({ username })
        .populate("activities")
        .populate({
          path: "friends",
          populate: [
            { path: "friends", model: "User" },
            { path: "requests", model: "Request" },
          ],
        })
        .populate({
          path: "requests",
          populate: {
            path: "sender recipient",
            model: "User",
          },
        });
      return user;
    },

    getUsersByIds: async (_, { ids }, context) => {
      isAuthenticated(context, "You must be logged in to view other users.");
      const users = await User.find({ _id: { $in: ids } });
      return users;
    },

    getMyUser: async (_, __, context) => {
      isAuthenticated(context, "You must be logged in to view your profile.");
      const user = await User.findById(context.user._id)
        .populate({
          path: "friends",
          populate: [
            { path: "friends", model: "User" },
            { path: "requests", model: "Request" },
          ],
        })
        .populate("activities")
        .populate({
          path: "invites",
          populate: [
            {
              path: "sender recipient",
              model: "User",
            },
            {
              path: "activity",
              model: "Activity",
            },
          ],
        })
        .populate({
          path: "requests",
          populate: {
            path: "sender recipient",
          },
        });
      return user;
    },

    searchUsers: async (_, { searchTerm }, context) => {
      isAuthenticated(context, "You must be logged in to search users.");
      const users = await User.find({
        $text: { $search: searchTerm },
        _id: { $ne: context.user._id },
      })
        .populate("friends")
        .populate("requests");
      if (!users) {
        throw new Error("No users found matching your search.");
      }
      return users;
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect email or password.");
      }
      const pwCorrect = await user.comparePassword(password);
      if (!pwCorrect) {
        throw new AuthenticationError("Incorrect email or password.");
      }
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (_, { input }, context) => {
      isAuthenticated(context, "You must be logged in to update your profile.");
      const user = await User.findByIdAndUpdate(context.user._id, input, {
        new: true,
      });
      return user;
    },

    deleteUser: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to delete your profile.");
      if (_id === context.user._id) {
        await User.findByIdAndDelete(_id);
        // hooks handle follow-up deletions and removals
        return true;
      } else {
        throw new AuthenticationError("You may only delete your own profile.");
      }
    },

    removeFriend: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to remove a friend.");
      await User.findByIdAndUpdate(context.user._id, {
        $pull: { friends: _id },
      });
      await User.findByIdAndUpdate(_id, {
        $pull: { friends: context.user._id },
      });
      return true;
    },
  },
};

module.exports = resolvers;
