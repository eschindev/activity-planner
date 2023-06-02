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
    createInvite(input: InviteInput): Invite
    updateInvite(_id: ID!, input: InviteUpdateInput): Invite
    deleteInvite(_id: ID!): Boolean
  }

  input InviteUpdateInput {
    status: String!
  }

  input InviteInput {
    recipient: ID!
    activity: ID!
  }
`;

module.exports = inviteSchema;
