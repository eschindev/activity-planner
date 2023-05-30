const activityResolvers = require("./ActivityResolvers");
const inviteResolvers = require("./InviteResolvers");
const requestResolvers = require("./RequestResolvers");
const userResolvers = require("./UserResolvers");

const resolvers = {
  Query: {
    ...activityResolvers.Query,
    ...inviteResolvers.Query,
    ...requestResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...activityResolvers.Mutation,
    ...inviteResolvers.Mutation,
    ...requestResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};

module.exports = resolvers;
