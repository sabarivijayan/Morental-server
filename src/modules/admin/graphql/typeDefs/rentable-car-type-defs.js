import { gql } from 'apollo-server-express'

const RentableCarTypeDefs = gql`
    scalar Float
    scalar Int


    type Manufacturer{
        id: ID!
        name: String!
        country: String!
    }
    type Car{
        id: ID!
        manufacturer: Manufacturer
        name: String!
        type: String!
        numberOfSeats: String!
        fuelType: String!
        transmissionType: String!
        description: String!
        quantity: String!
        manufacturerId: String!
        primaryImageUrl: String
        secondaryImagesUrls: [String]
        year: String!
    }

    type RentableCar{
        id: ID!
        carId: ID!
        pricePerDay: Float!
        availableQuantity: Int!
        car: Car
    }

    type Query{
        getRentableCars: [RentableCar!]!
    }

    type Mutation{
        addRentableCar(carId: ID!, pricePerDay: Float!, availableQuantity: Int!): RentableCar
        deleteRentableCar(id: ID): RentableCar
    }
`;
export default RentableCarTypeDefs;