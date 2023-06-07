const { Activity, User, Invite } = require("../../models");
const { AuthenticationError } = require("apollo-server-express");
const { isAuthenticated } = require("../../utils/auth");

const resolvers = {
  Query: {
    getAllActivities: async (_, __, context) => {
      isAuthenticated(context, "You must be logged in to view activities.");
      const activities = await Activity.find();
      return activities;
    },

    getActivityById: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to view activities.");
      const activity = await Activity.findById(_id)
        .populate("owner")
        .populate({
          path: "participants",
          populate: [
            { path: "friends", model: "User" },
            { path: "requests", model: "Request" },
          ],
        })
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
          path: "comments",
          populate: {
            path: "user",
            model: "User",
          },
        });
      return activity;
    },

    searchActivities: async (_, { searchTerm }, context) => {
      isAuthenticated(context, "You must be logged in to search activities.");
      const activities = await Activity.find({
        $text: { $search: searchTerm },
        private: false,
      }).populate("owner");
      if (!activities) {
        throw new Error("No activities found matching your search.");
      }
      return activities;
    },

    getActivitiesByIds: async (_, { ids }, context) => {
      isAuthenticated(context, "You must be logged in to view activities.");
      const activities = await Activity.find({ _id: { $in: ids } });
      return activities;
    },
  },

  Mutation: {
    createActivity: async (_, { input }, context) => {
      isAuthenticated(context, "You must be logged in to create activities.");
      const activity = await Activity.create({
        ...input,
        owner: context.user._id,
        participants: [context.user._id],
      });
      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { activities: activity._id },
      });
      return activity;
    },

    updateActivity: async (_, { _id, input }, context) => {
      isAuthenticated(context, "You must be logged in to update activities.");
      let activity = await Activity.findById(_id).populate("owner");
      console.log(activity.owner._id);
      console.log(context.user._id);
      if (!activity) {
        throw new Error("No activity found with this id.");
      } else if (!(activity.owner._id == context.user._id)) {
        throw new AuthenticationError("You do not own this activity.");
      }
      activity = await Activity.findByIdAndUpdate(_id, input, {
        new: true,
      });
      return activity;
    },

    deleteActivity: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to delete activities.");
      let activity = await Activity.findById(_id);
      if (!activity) {
        throw new Error("No activity found with this id.");
      } else if (!(activity.owner._id == context.user._id)) {
        throw new AuthenticationError("You do not own this activity.");
      }
      await Activity.findByIdAndDelete(_id);
      return true;
      // hooks on the Activity and Invite schemas handle deletion of associated records
    },

    joinActivity: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to join activities.");
      await Activity.findByIdAndUpdate(_id, {
        $addToSet: { participants: context.user._id },
      });
      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: { activities: _id },
      });
      return true;
    },

    leaveActivity: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to leave activities.");
      await Activity.findByIdAndUpdate(_id, {
        $pull: { participants: context.user._id },
      });
      await User.findByIdAndUpdate(context.user._id, {
        $pull: { activities: _id },
      });
      return true;
    },

    addComment: async (_, { _id, commentBody }, context) => {
      isAuthenticated(context, "You must be logged in to add comments.");
      comment = {
        commentBody,
        user: context.user._id,
        username: context.user.username,
        timestamp: new Date().toISOString(),
      };
      const activity = await Activity.findByIdAndUpdate(
        _id,
        { $addToSet: { comments: comment } },
        { new: true }
      );
      return true;
    },

    deleteComment: async (_, { commentId }, context) => {
      isAuthenticated(context, "You must be logged in to delete comments.");
      const activity = await Activity.findOneAndUpdate(
        {
          "comments.commentId": commentId,
          "comments.user": context.user._id,
        },
        { $pull: { comments: { commentId } } },
        { new: true }
      );
      if (!activity) {
        throw new Error(
          "Comment not found or you do not have permission to delete."
        );
      }
      return true;
    },
  },
};

module.exports = resolvers;
