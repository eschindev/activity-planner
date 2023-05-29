const { gql } = require("apollo-server-express");

const requestSchema = gql`
  type Request {
    _id: ID!
    sender: User!
    recipient: User!
    status: String
  }

  type Query {
    getRequestById(_id: ID!): Request
    getRequestsByRecipient(recipient: ID!): [Request]
    getRequestsBySender(sender: ID!): [Request]
  }

  type Mutation {
    createRequest(input: RequestInput): Request
    updateRequest(_id: ID!, input: RequestUpdateInput): Request
    deleteRequest(_id: ID!): Boolean
  }

  input RequestUpdateInput {
    status: String!
  }

  input RequestInput {
    sender: ID!
    recipient: ID!
  }
`;

module.exports = requestSchema;
