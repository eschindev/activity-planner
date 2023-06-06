const { gql } = require("apollo-server-express");

const userSchema = gql`
  type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
    email: String!
    friends: [User]
    activities: [Activity]
    invites: [Invite]
    requests: [Request]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUserById(_id: ID!): User
    getUserByUsername(username: String!): User
    # getFullUserById(_id: ID!): User
    getAllUsers: [User]
    getUsersByIds(ids: [ID!]!): [User]
    getMyUser: User
    searchUsers(searchTerm: String!): [User]
  }

  type Mutation {
    createUser(input: UserInput): Auth
    login(email: String!, password: String!): Auth
    updateUser(input: UserUpdateInput): User
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
