const { gql } = require("apollo-server-express");

const inviteSchema = gql`
  type Invite {
    _id: ID!
    sender: User!
    recipient: User!
    activity: Activity!
    status: String!
  }

  type Query {
    getInviteById(_id: ID!): Invite
    getInvitesByIds(ids: [ID!]!): [Invite]
  }

  type Mutation {
    createInvite(recipient: ID!, activity: ID!): Boolean
    updateInvite(_id: ID!, status: String!): Boolean
    deleteInvite(_id: ID!): Boolean
  }
`;

module.exports = inviteSchema;
