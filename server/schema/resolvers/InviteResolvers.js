const { User, Invite, Activity } = require("../../models");

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
    createInvite: async (_, { input }) => {
      try {
        //first check if user has already received an invite to this activity
        const { recipient, activity } = input;
        const existingInvite = await Invite.findOne({
          recipient,
          activity,
        });

        if (existingInvite) {
          throw new Error(
            "This user has already been invited to this activity."
          );
        }

        const invite = await Invite.create(input);
        return invite;
      } catch (error) {
        throw error;
      }
      // post-create hook on Invite model handles adding invite to activity's and recipient's invites arrays
    },
    updateInvite: async (_, { _id, input }) => {
      try {
        const invite = await Invite.findByIdAndUpdate(_id, input, {
          new: true,
        });

        switch (input.status) {
          case "accepted":
            await Activity.findByIdAndUpdate(invite.activity, {
              $addToSet: { participants: invite.recipient },
            });
            await User.findByIdAndUpdate(invite.recipient, {
              $addToSet: { activities: invite.activity },
            });
            break;
          case "rejected":
            await Activity.findByIdAndUpdate(invite.activity, {
              $pull: { participants: invite.recipient },
            });
            await User.findByIdAndUpdate(invite.recipient, {
              $pull: { activities: invite.activity },
            });
            break;
        }

        return invite;
      } catch (error) {
        throw error;
      }
    },
    deleteInvite: async (_, { _id }) => {
      try {
        await Invite.findByIdAndDelete(_id);
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
