const { User, Invite, Activity } = require("../../models");
const { AuthenticationError } = require("apollo-server-express");
const { isAuthenticated } = require("../../utils/auth");

const resolvers = {
  Query: {
    getInviteById: async (_, { _id }) => {
      try {
        const invite = await Invite.findById(_id);
        return invite;
      } catch (error) {
        throw error;
      }
    },

    getInvitesByIds: async (_, { ids }) => {
      try {
        const invites = await Invite.find({ _id: { $in: ids } });
        return invites;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createInvite: async (_, { recipient, activity }, context) => {
      isAuthenticated(
        context,
        "You must be logged in to respond to create invites."
      );
      try {
        //first check if user has already received an invite to this activity
        if (context.user) {
          const existingInvite = await Invite.findOne({
            recipient,
            activity,
          });

          if (existingInvite) {
            throw new Error(
              "This user has already been invited to this activity."
            );
          }

          const invite = await Invite.create({
            recipient,
            activity,
            sender: context.user._id,
          });
          return true;
        } else {
          throw new AuthenticationError(
            "You must be logged in to invite users to activities."
          );
        }
      } catch (error) {
        throw error;
      }
      // post-create hook on Invite model handles adding invite to activity's and recipient's invites arrays
    },

    updateInvite: async (_, { _id, status }, context) => {
      isAuthenticated(context, "You must be logged in to respond to invites.");

      console.log(status);
      console.log(_id);
      await Invite.findByIdAndUpdate(_id, { status: status });
      return true;
    },

    deleteInvite: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to delete invites.");
      const invite = await Invite.findById(_id).populate("activity");
      if (
        context.user._id !== invite.sender ||
        context.user._id !== invite.activity.owner
      ) {
        throw new AuthenticationError(
          "You can only delete invites that you sent or for activites you created."
        );
      }
      await Invite.findByIdAndDelete(_id);
      return true;
    },
  },
};

module.exports = resolvers;
