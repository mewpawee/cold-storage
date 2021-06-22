import { gql } from "apollo-server";

export default gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    groups: [UserGroup]
    mapper: [DeviceMapper]
    minThreshold: Float
    maxThreshold: Float
  }

  type Token {
    token: String!
  }

  type UserGroup {
    _id: ID!
    groupName: String!
    groupData(limit: Int): [GroupData]
  }

  type GroupData {
    _id: ID!
    date: Date!
    dateString: String
    lat: Float!
    lng: Float!
    devices: [Device]
  }

  type Device {
    _id: ID!
    deviceId: String!
    temp: Float!
  }

  type DeviceMapper {
    _id: ID!
    deviceUUID: String!
    deviceId: String!
  }

  type Query {
    user: User!
    login(username: String!, password: String): Token!
    groupData(
      groupName: String!
      date: Date
      limit: Int
      startDate: Date
      endDate: Date
    ): [GroupData]
    deviceMapper(deviceUUID: String!): DeviceMapper!
  }

  type Mutation {
    createUser(username: String!, password: String!): User!
    changeThreshold(minThreshold: Float, maxThreshold: Float): User!
    addUserGroup(username: String!, groupName: String!): UserGroup!
    addGroupData(
      username: String!
      groupName: String!
      lat: Float!
      lng: Float!
      devices: [device]
    ): GroupData
    addDeviceMapper(
      username: String!
      deviceUUID: String!
      deviceId: String!
    ): DeviceMapper!
  }

  input device {
    deviceUUID: String!
    temp: Float!
  }
`;
