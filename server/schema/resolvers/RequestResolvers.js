const { Request, User } = require("../../models");
const { isAuthenticated } = require("../../utils/auth");
// update all of these resolvers with context and authentication/authorization
const resolvers = {
  Query: {
    getRequestById: async (_, { _id }, context) => {
      isAuthenticated(context, "You must be logged in to view requests.");
      const request = await Request.findById(_id)
        .populate("sender")
        .populate("recipient");
      return request;
    },

    getRequestsByIds: async (_, { ids }, context) => {
      isAuthenticated(context, "You must be logged in to view requests.");
      const requests = await Request.find({ _id: { $in: ids } })
        .populate("sender")
        .populate("recipient");
      return requests;
    },
  },

  Mutation: {
    createRequest: async (_, { recipient }, context) => {
      isAuthenticated(context, "You must be logged in to send requests.");
      const existingOutboundRequest = await Request.findOne({
        sender: context.user._id,
        recipient,
      });
      if (existingOutboundRequest) {
        throw new Error("You have already sent this user a friend request.");
      }
      const existingInboundRequest = await Request.findOne({
        sender: recipient,
        recipient: context.user._id,
      });
      if (existingInboundRequest) {
        throw new Error(
          "Please instead accept the existing friend request from this user."
        );
      }
      const newRequest = await Request.create({
        sender: context.user._id,
        recipient: recipient,
      });
      return newRequest;
      // post-create hook for adding request to recipient's requests array
    },

    updateRequest: async (_, { _id, status }, context) => {
      isAuthenticated(context, "You must be logged in to respond to requests.");
      if (context.user._id === request.recipient) {
        const request = await Request.findByIdAndUpdate(
          _id,
          { status },
          {
            new: true,
          }
        );
        // post-findOneAndUpdate hook adds friends to both users' friends arrays if accepted
        // that same hook then deletes the request document
        // a pre-delete hook removes the request ID from both users' requests arrays
        return request;
      } else {
        throw new AuthenticationError(
          "You may only respond to requests sent to you."
        );
      }
    },

    deleteRequest: async (_, { _id }) => {
      try {
        // pre-delete hook to remove request ID from recipient's requests array
        isAuthenticated(context, "You must be logged in to delete requests.");
        if (context.user._id === request.sender) {
          await Request.findByIdAndDelete(_id);
          return true;
        } else {
          throw new AuthenticationError(
            "You may only delete requests you sent."
          );
        }
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
