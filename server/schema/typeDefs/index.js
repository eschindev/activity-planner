const { mergeTypeDefs } = require("@graphql-tools/merge");
const userTypeDefs = require("./userTypeDefs");
const activityTypeDefs = require("./activityTypeDefs");
const inviteTypeDefs = require("./inviteTypeDefs");
const requestTypeDefs = require("./requestTypeDefs");

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  activityTypeDefs,
  inviteTypeDefs,
  requestTypeDefs,
]);

module.exports = typeDefs;
