import { gql } from "apollo-server";

export default gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    trucks: [UsersTruck]
  }

  type Token {
    token: String!
  }

  type UsersTruck {
    _id: ID!
    user: User!
    truckId: String!
    trucksData: [TrucksData]
  }

  type TrucksData {
    _id: ID!
    truck: UsersTruck!
    date: Date!
    temp: Float!
    lat: Float!
    lng: Float!
  }

  type Query {
    user: User!
    login(username: String!, password: String): Token!
    trucksData(truckId: String!): [TrucksData]
  }

  type Mutation {
    createUser(username: String!, password: String!): User!
    addUsersTruck(truckId: String!): UsersTruck!
    addTrucksData(
      truckId: String!
      date: Date
      temp: Float!
      lat: Float!
      lng: Float!
    ): TrucksData!
  }
`;
