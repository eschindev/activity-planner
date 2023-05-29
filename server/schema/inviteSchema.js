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
    getInvitesByActivity(activity: ID!): [Invite]
    getInvitesByRecipient(recipient: ID!): [Invite]
    getInvitesBySender(sender: ID!): [Invite]
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
    sender: ID!
    recipient: ID!
    activity: ID!
  }
`;

module.exports = inviteSchema;
