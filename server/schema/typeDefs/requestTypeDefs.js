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
    getRequestsByIds(ids: [ID!]!): [Request]
  }

  type Mutation {
    createRequest(recipient: ID!): Request
    updateRequest(_id: ID!, status: String!): Boolean
    deleteRequest(_id: ID!): Boolean
  }
`;

module.exports = requestSchema;
