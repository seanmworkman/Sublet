import gql from "graphql-tag"

export const GET_USERS = gql`
  query {
    users {
      id
      login
      avatar_url
    }
  }
`

export const READ_USER_LOGIN = gql`
  query ReadUserLogin($id: String!) {
    userLogin(id: $id) {
      id
    }
  }
`;

export const WRITE_USER_LOGIN = gql`
  query WriteUserLogin($id: String!) {
    userLogin(id: $id) {
      id
    }
  }
`;