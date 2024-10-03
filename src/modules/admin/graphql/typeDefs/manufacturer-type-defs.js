import { gql } from 'apollo-server-express';

const manufactureTypeDefs = gql`
  type Manufacturer {
    id: ID!
    name: String!
    carModel: String!
    carType: String!
  }

  type Query {
    manufacturers: [Manufacturer]
    manufacturer(id: ID!): Manufacturer
  }

  type Mutation {
    addManufacturer(name: String!, carModel: String!, carType: String!): Manufacturer
    editManufacturer(id: ID!, name: String, carModel: String, carType: String): Manufacturer
    deleteManufacturer(id: ID!): Boolean
  }
`;

export default manufactureTypeDefs;
