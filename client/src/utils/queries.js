import { gql } from "@apollo/client";
//query = looking for data (gql similar to SQL)
export const QUERY_USER = gql`
  # get data for your own profile
  query getMyUser {
    getMyUser {
      username
      firstName
      lastName
      fullName
      email
      activities {
        _id
        name
        date
        location
      }
      invites {
        sender {
          _id
          username
          firstName
          lastName
          fullName
        }
        activity {
          _id
          name
          date
          owner {
            _id
            username
            firstName
            lastName
            fullName
          }
        }
      }
      friends {
        _id
        username
        firstName
        lastName
        fullName
      }
      requests {
        sender {
          _id
          username
          firstName
          lastName
          fullName
        }
      }
    }
  }

  # get data for someone else's profile
  query getUserById($id: ID!) {
    getUserById(_id: $id) {
      username
      firstName
      lastName
      fullName
      email
      friends {
        _id
        username
        firstName
        lastName
        fullName
      }
      activities {
        _id
        name
        date
        location
      }
    }
  }

  # search for users
  query searchUsers($searchTerm: String!) {
    searchUsers(searchTerm: $searchTerm) {
      _id
      username
      firstName
      lastName
      fullName
    }
  }

  # get activity page data
  query getActivityById($id: ID!) {
    getActivityById(_id: $id) {
      name
      description
      date
      location
      private
      owner {
        username
        firstName
        lastName
      }
      participants {
        _id
        username
        firstName
        lastName
        fullName
      }
      invites {
        _id
        sender {
          _id
          username
          firstName
          lastName
          fullName
        }
        recipient {
          _id
          username
          firstName
          lastName
          fullName
        }
        status
      }
      comments {
        _id
        commentBody
        user {
          _id
          username
          firstName
          lastName
          fullName
        }
        timestamp
      }
    }
  }

  # search for activities
  query searchActivities($searchTerm: String!) {
    searchActivities(searchTerm: $searchTerm) {
      _id
      name
      description
      date
      location
      owner {
        _id
        username
        firstName
        lastName
        fullName
      }
    }
  }
`;
