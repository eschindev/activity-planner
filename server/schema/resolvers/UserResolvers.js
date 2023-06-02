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

    searchUsers: async (_, { searchTerm }, context) => {
      isAuthenticated(context, "You must be logged in to search users.");
      const users = await User.find({
        $text: { $search: searchTerm },
        _id: { $ne: context.user._id },
      });
      if (!users) {
        throw new Error("No users found matching your search.");
      }
      return users;
    },

    getUserById: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to view other users.");
      const user = await User.findById(_id)
        .populate("friends")
        .populate("activites");
      return user;
    },

    getMyUser: async (_, __, context) => {
      isAuthenticated(context, "You must be logged in to view your profile.");
      const user = await User.findById(context.user._id)
        .populate("friends")
        .populate("activites")
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
            model: "User",
          },
        });
      return user;
    },

    getFullUserById: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to view user profiles.");
      const user = await User.findById(_id)
        .populate("friends")
        .populate("activites");
      return user;
    },

    getUsersByIds: async (_, { ids }, context) => {
      isAuthenticated(context, "You must be logged in to view other users.");
      const users = await User.find({ _id: { $in: ids } });
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
        return true;
      } else {
        throw new AuthenticationError("You may only delete your own profile.");
      }
    },
  },
};

module.exports = resolvers;
