import gql from "graphql-tag"

export const GET_USERS = gql`
  query {
    users {
      id
      login
      avatar_url
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      first_name
      last_name
      phone
      email
    }
  }
`;

export const GET_ALL_PLACES_WITH_SPECS = gql`
  query {
    getAllPlacesWithSpecs {
      address_line1
      address_line2
      city
      state
      zip_code
      sqrft
      bedrooms
      bathrooms
      price
    }
  }
`;

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