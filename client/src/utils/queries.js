import { gql } from "@apollo/client";
//query = looking for data (gql similar to SQL)
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      firstName
      lastName
      email
      friends {
        _id
        username
        firstName
        lastName
      }
      activities {
        _id
        name
        date
        location
      }
      invites {
        _id
        activity {
            name
            date
        }
        status
      }
      requests {
        _id
        sender
        status
      }
    }
  }
`;
