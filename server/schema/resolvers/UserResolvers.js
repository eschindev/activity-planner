const { User } = require("../../models");

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw error;
      }
    },
    getUserById: async (_, { _id }) => {
      try {
        const user = await User.findById(_id);
        return user;
      } catch (error) {
        throw error;
      }
    },
    getUsersByIds: async (_, { ids }) => {
      try {
        const users = await User.find({ _id: { $in: ids } });
        return users;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const user = await User.create(input);
        return user;
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (_, { _id, input }) => {
      try {
        const user = await User.findByIdAndUpdate(_id, input, { new: true });
        return user;
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        await User.findByIdAndDelete(_id);
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
