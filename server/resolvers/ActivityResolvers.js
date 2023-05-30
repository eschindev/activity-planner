const { Activity, User, Invite } = require("../models");

const resolvers = {
  Query: {
    getAllActivities: async () => {
      try {
        const activities = await Activity.find();
        return activities;
      } catch (error) {
        throw error;
      }
    },
    getActivityById: async (_, { _id }) => {
      try {
        const activity = await Activity.findById(_id);
        return activity;
      } catch (error) {
        throw error;
      }
    },
    getActivitiesByIds: async (_, { ids }) => {
      try {
        const activities = await Activity.find({ _id: { $in: ids } });
        return activities;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createActivity: async (_, { input }) => {
      try {
        const activity = await Activity.create(input);
        return activity;
      } catch (error) {
        throw error;
      }
    },
    updateActivity: async (_, { _id, input }) => {
      try {
        const activity = await Activity.findByIdAndUpdate(_id, input, {
          new: true,
        });
        return activity;
      } catch (error) {
        throw error;
      }
    },
    deleteActivity: async (_, { _id }) => {
      try {
        await Activity.findByIdAndDelete(_id);
        return true;
      } catch (error) {
        throw error;
      }
      // hooks on the Activity and Invite schemas handle deletion of associated records
    },
    addComment: async (_, { _id, input }) => {
      try {
        const activity = await Activity.findByIdAndUpdate(
          _id,
          { $addToSet: { comments: input } },
          { new: true }
        );
        return activity;
      } catch (error) {
        throw error;
      }
    },
    deleteComment: async (_, { _id, commentId }) => {
      try {
        const activity = await Activity.findByIdAndUpdate(
          _id,
          { $pull: { comments: { commentId } } },
          { new: true }
        );
        return activity;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
