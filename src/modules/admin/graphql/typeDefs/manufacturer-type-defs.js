import { gql } from "apollo-server-express";

const manufacturerTypeDefs = gql`
  type Manufacturer {
    id: ID!
    name: String!
    carModelName: String!
    carType: String!
  }

  input CreateManufacturerInput {
    name: String!
    carModelName: String!
    carType: String!
  }

  type Query {
    getAllManufacturers: [Manufacturer!]!
    getManufacturerById(id: ID!): Manufacturer
  }

  type Mutation {
    createManufacturer(input: CreateManufacturerInput!): Manufacturer!
    updateManufacturer(id: ID!, input: CreateManufacturerInput!): Manufacturer!
    deleteManufacturer(id: ID!): Boolean!
  }
`;

export default manufacturerTypeDefs;
