import { gql } from "@apollo/client";
//query = looking for data (gql similar to SQL)
export const QUERY_ME = gql`
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
        activity {
          _id
          name
          date
        }
      }
      friends {
        _id
        username
        firstName
        lastName
        fullName
        friends {
          _id
        }
        requests {
          sender {
            _id
          }
          recipient {
            _id
          }
        }
      }
      requests {
        _id
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
`;
export const QUERY_USER = gql`
  # get data for someone else's profile
  query getUserById($id: ID!) {
    getUserById(_id: $id) {
      _id
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
        friends {
          _id
        }
        requests {
          sender {
            _id
          }
          recipient {
            _id
          }
        }
      }
      activities {
        _id
        name
        date
        location
      }
    }
    requests {
      sender {
        _id
      }
      recipient {
        _id
      }
    }
  }
`;

export const QUERY_USERNAME = gql`
  # get data for someone else's profile
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      _id
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
        friends {
          _id
        }
        requests {
          sender {
            _id
          }
          recipient {
            _id
          }
        }
      }
      activities {
        _id
        name
        date
        location
      }
      requests {
        sender {
          _id
        }
      }
    }
  }
`;
export const QUERY_USERS = gql`
  # search for users
  query searchUsers($searchTerm: String!) {
    searchUsers(searchTerm: $searchTerm) {
      _id
      username
      firstName
      lastName
      fullName
      friends {
        _id
      }
      requests {
        sender {
          _id
        }
        recipient {
          _id
        }
      }
    }
  }
`;

export const QUERY_ACTIVITY = gql`
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
        friends {
          _id
        }
        requests {
          sender {
            _id
          }
          recipient {
            _id
          }
        }
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
        activity {
          _id
          name
          date
          location
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
`;
export const QUERY_ACTIVITIES = gql`
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
