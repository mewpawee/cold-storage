import { gql } from "apollo-server";

export default gql`
  scalar Date

  type User{
    _id: ID!
    username: String!
  }

  type Token {
    token: String!
  }

  type Truck {
    _id: ID,
    owner: String!,
    truck_id: String!,
    lat: Float!,
    lng: Float!,
    temp: Float!,
    date: Date
  }

  type Query {
    user: User!
    login(username: String!, password: String): Token!
    trucks: [Truck]
  }

  input DateInput{
    date: Date
  }

  input TruckInput {
    owner: String,
    truck_id: String!,
    lat: Float!,
    lng: Float!,
    temp: Float!,
    date: Date
  }

  type Mutation {
    createUser(
      username: String!,
      password: String!
    ): User!

    createTruck(input: TruckInput): Truck
  }
`;
