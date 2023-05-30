const { Request, User } = require("../models");

const resolvers = {
  Query: {
    getRequestById: async (_, { _id }) => {
      try {
        const request = await Request.findById(_id);
        return request;
      } catch (error) {
        throw error;
      }
    },
    getRequestsByIds: async (_, { ids }) => {
      try {
        const requests = await Request.find({ _id: { $in: ids } });
        return requests;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createRequest: async (_, { input }) => {
      try {
        const { sender, recipient } = input;

        const existingOutboundRequest = await Request.findOne({
          sender,
          recipient,
        });

        if (existingOutboundRequest) {
          throw new Error("You have already sent this user a friend request.");
        }

        const existingInboundRequest = await Request.findOne({
          sender: recipient,
          recipient: sender,
        });

        if (existingInboundRequest) {
          throw new Error(
            "Please accept the existing friend request from this user."
          );
        }

        const request = await Request.create(input);
        return request;
        // post-create hook for adding request to recipient's requests array
      } catch (error) {
        throw error;
      }
    },
    updateRequest: async (_, { _id, input }) => {
      try {
        const request = await Request.findByIdAndUpdate(_id, input, {
          new: true,
        });

        switch (input.status) {
          case "accepted":
            await User.findByIdAndUpdate(request.sender, {
              $addToSet: { friends: request.recipient },
            });
            await User.findByIdAndUpdate(request.recipient, {
              $addToSet: { friends: request.sender },
            });
            break;
          case "rejected":
            // pre-delete hook to remove request ID from recipient's requests array
            await Request.findByIdAndDelete(_id);
            break;
        }

        return request;
      } catch (error) {
        throw error;
      }
    },
    deleteRequest: async (_, { _id }) => {
      try {
        // pre-delete hook to remove request ID from recipient's requests array
        await Request.findByIdAndDelete(_id);
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
