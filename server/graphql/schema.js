import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    first_name: String
    last_name: String
    phone: String
    email: String
  }

  type Place {
    address_line1: String
    address_line2: String
    city: String
    state: String
    zip_code: String
    sqrft: Float
    bedrooms: Float
    bathrooms: Float
    price: Float
  }

  type Query {
    users: [User]
    getAllUsers: [User]
    getAllPlacesWithSpecs: [Place]
  }
`
