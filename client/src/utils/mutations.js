import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(input: $input) {
      token
      user {
        email
        username
        _id
      }
    }
  }
`;
// {
//   "input": {
//     "username": required
//     "firstName": required
//     "lastName": required
//     "email": required
//     "password": required
//   }
// }

export const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdateInput) {
    updateUser(input: $input) {
      username
      firstName
      lastName
      fullName
      email
    }
  }
`;
// {
//   "input": {
//     "username": not required
//     "firstName": not required
//     "lastName": not required
//     "email": not required
//     "password": not required
//   }
// }

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id)
  }
`;

export const CREATE_ACTIVITY = gql`
  mutation createActivity($input: ActivityInput) {
    createActivity(input: $input) {
      _id
    }
  }
`;
// {
//   "input": {
//     "name": required
//     "description": not required
//     "date": required
//     "location": required
//     "private": required
//   }
// }

export const UPDATE_ACTIVITY = gql`
  mutation updateActivity($id: ID!, $input: ActivityUpdateInput) {
    updateActivity(_id: $id, input: $input) {
      _id
    }
  }
`;
// {
//   "input": {
//     "name": not required
//     "description": not required
//     "date": not required
//     "location": not required
//     "private": not required
//   }
// }

export const DELETE_ACTIVITY = gql`
  mutation deleteActivity($id: ID!) {
    deleteActivity(_id: $id)
  }
`;

export const JOIN_ACTIVITY = gql`
  mutation joinActivity($id: ID!) {
    joinActivity(_id: $id)
  }
`;

export const LEAVE_ACTIVITY = gql`
  mutation leaveActivity($id: ID!) {
    leaveActivity(_id: $id)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($id: ID!, $commentBody: String!) {
    addComment(_id: $id, commentBody: $commentBody)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!, $commentId: ID!) {
    deleteComment(_id: $id, commentId: $commentId)
  }
`;
// id argument is for activity id

export const CREATE_INVITE = gql`
  mutation createInvite($recipient: ID!, $activity: ID!) {
    createInvite(recipient: $recipient, activity: $activity) {
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
  }
`;

export const UPDATE_INVITE = gql`
  mutation updateInvite($id: ID!, $status: String!) {
    updateInvite(_id: $id, status: $status)
  }
`;

export const DELETE_INVITE = gql`
  mutation deleteInvite($id: ID!) {
    deleteInvite(_id: $id)
  }
`;

export const CREATE_REQUEST = gql`
  mutation createRequest($recipient: ID!) {
    createRequest(recipient: $recipient) {
      _id
    }
  }
`;

export const UPDATE_REQUEST = gql`
  mutation updateRequest($id: ID!, $status: String!) {
    updateRequest(_id: $id, status: $status)
  }
`;

export const DELETE_REQUEST = gql`
  mutation deleteRequest($id: ID!) {
    deleteRequest(_id: $id)
  }
`;
