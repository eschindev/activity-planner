const { gql } = require("apollo-server-express");

const activitySchema = gql`
  type Activity {
    _id: ID!
    name: String!
    description: String
    date: String!
    # for date, GraphQL has no Date type, so let's format as a string: YYYY-MM-DDTHH:MM:SSZ
    location: String!
    private: Boolean
    owner: User
    participants: [User]
    invites: [Invite]
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    commentBody: String!
    user: User!
    username: String!
    timestamp: String!
  }

  type Query {
    getAllActivities: [Activity]
    getActivityById(_id: ID!): Activity
    searchActivities(searchTerm: String!): [Activity]
    getActivitiesByIds(ids: [ID!]!): [Activity]
  }

  type Mutation {
    createActivity(input: ActivityInput): Activity
    updateActivity(_id: ID!, input: ActivityUpdateInput): Activity
    deleteActivity(_id: ID!): Boolean
    addComment(_id: ID!, commentBody: String!): Activity
    deleteComment(_id: ID!, commentId: ID!): Activity
  }

  input ActivityUpdateInput {
    name: String
    description: String
    date: String
    # for date, GraphQL has no Date type, so let's format as a string: YYYY-MM-DDTHH:MM:SSZ
    location: String
    private: Boolean
  }

  input ActivityInput {
    name: String!
    description: String
    date: String!
    # for date, GraphQL has no Date type, so let's format as a string: YYYY-MM-DDTHH:MM:SSZ
    location: String!
    private: Boolean
  }
`;

module.exports = activitySchema;
