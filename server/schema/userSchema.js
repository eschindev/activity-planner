const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    friends: [User]
    activities: [Activity]
    invites: [Invite]
    requests: [Request]
  }

  type Query {
    getUserById(_id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(_id: ID!, input: UserUpdateInput): User
    deleteUser(_id: ID!): Boolean
  }

  input UserUpdateInput {
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    activities: [ID]
  }

  input UserInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;

module.exports = userSchema;
