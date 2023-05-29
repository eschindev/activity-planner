const { mergeSchemas } = require("graphql-tools");
const userSchema = require("./userSchema");
const activitySchema = require("./activitySchema");
const inviteSchema = require("./inviteSchema");
const requestSchema = require("./requestSchema");

const schema = mergeSchemas({
  schemas: [userSchema, activitySchema, inviteSchema, requestSchema],
});

module.exports = schema;
