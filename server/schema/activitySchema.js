const { gql } = require("apollo-server-express");

const activitySchema = gql`
  type Activity {
    _id: ID!
    name: String!
    description: String
    date: Date!
    location: String!
    private: Boolean
    owner: User
    participants: [User]
    invites: [Invite]
    comments: [Comment]
  }

  type Query {
    getActivityById(_id: ID!): Activity
    getAllActivities: [Activity]
  }

  type Mutation {
    createActivity(input: ActivityInput): Activity
    updateActivity(_id: ID!, input: ActivityUpdateInput): Activity
    deleteActivity(_id: ID!): Boolean
  }

  input ActivityUpdateInput {
    name: String
    description: String
    date: Date
    location: String
    private: Boolean
    participants: [ID]
    invites: [ID]
    comments: [CommentInput]
  }

  input ActivityInput {
    name: String!
    description: String
    date: Date!
    location: String!
    private: Boolean
    owner: ID!
  }

  input CommentInput {
    commentBody: String!
    user_id: ID!
    username: String!
  }
`;

module.exports = activitySchema;
