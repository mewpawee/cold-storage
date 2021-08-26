import {
  Company,
  User,
  UserGroup,
  GroupData,
  Device,
  DeviceMapper,
} from "./models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";
import moment from "moment";

const getDate = () => {
  return new Promise((resolve, reject) => {
    let date = new Date();
    resolve(date);
  });
};

export default {
  Query: {
    company: async (parent, _, { me }, info) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await User.findById({ _id: me._id }).exec();
      let company = await Company.findOne({ name: user.company });
      return company;
    },
    user: async (parent, _, { me }, info) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await User.findById({ _id: me._id }).exec();
      return user;
    },

    login: async (parent, { username, password }, info) => {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign(
        { _id: user.id, role: user.role },
        "riddlemethis",
        {
          expiresIn: 24 * 10 * 50,
        }
      );

      return {
        token: token,
      };
    },
    groupData: async (
      parent,
      { groupName, startDate, endDate, limit = 100000 },
      { me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await User.findById({ _id: me._id });
      const userGroup = await UserGroup.findOne({
        user: user.company,
        groupName: groupName,
      });

      if (startDate === undefined || endDate === undefined) {
        const groupData = await GroupData.find({
          group: userGroup._id,
        })
          .sort({ date: -1 })
          .limit(limit)
          .exec();
        return groupData;
      }

      const start = moment(new Date(startDate)).utcOffset("+0700")
      const end = moment(new Date(endDate)).utcOffset("+0700")
      const groupData = await GroupData.find({
        group: userGroup._id,
        date: {
          $gte: start.toDate(),
          $lt: end.toDate(),
        },
      })
        .sort({ date: -1 })
        .limit(limit)
        .exec();
      // console.log(startDate, endDate);
      return groupData;
    },
    deviceMapper: async (parent, { deviceUUID }, { me }) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await User.findById({ _id: me._id });
      const deviceMapper = await DeviceMapper.findOne({
        company: user.company,
        deviceUUID: deviceUUID,
      }).exec();

      return deviceMapper;
    },
  },

  Mutation: {
    createUser: async (parent, { username, password, company }, info) => {
      const isCompany = await Company.findOne({ name: company });
      if (!isCompany) {
        await Company.create({ name: company });
      }
      const user = await User.create({
        username: username,
        password: password,
        role: "user",
        company: company,
      });
      return user;
    },
    changeThreshold: async (
      parent,
      { minThreshold, maxThreshold },
      { me },
      info
    ) => {
      if (!me || me.role != "admin") {
        throw new AuthenticationError("You are not authenticated");
      }
      const user = await User.findById({ _id: me._id });
      const result = await Company.findOneAndUpdate(
        {
          name: user.company,
        },
        { minThreshold: minThreshold, maxThreshold: maxThreshold },
        { new: true }
      );
      return result;
    },
    addUserGroup: async (parent, { username, groupName }, info) => {
      const user = await User.findOne({ username: username });
      return await UserGroup.create({
        user: user.company,
        groupName: groupName,
      });
    },
    addDeviceMapper: async (
      parent,
      { deviceUUID, deviceId },
      { me },
      info
    ) => {
      if (!me || me.role != "admin") {
        throw new AuthenticationError("You are not an admin");
      }
      const user = await User.findById({ _id: me._id });
      const result = await DeviceMapper.findOneAndUpdate(
        {
          company: user.company,
          deviceId: deviceId,
        },
        { company: user.company, deviceId: deviceId, deviceUUID: deviceUUID },
        { upsert: true, new: true }
      );
      return result;
    },
    addGroupData: async (
      parent,
      { username, groupName, lat, lng, devices },
      info
    ) => {
      const date = await getDate();
      const todayDate = await date.toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
      });
      const user = await User.findOne({ username: username });
      let userGroup = await UserGroup.findOne({
        user: user.company,
        groupName: groupName,
      });
      if (!userGroup) {
        userGroup = await UserGroup.create({
          user: user.company,
          groupName: groupName,
        });
      }
      const groupData = await GroupData.create({
        group: userGroup._id,
        date: date,
        dateString: todayDate,
        lat: lat,
        lng: lng,
      });
      for (const device of devices) {
        const deviceMapper = await DeviceMapper.findOne({
          company: user.company,
          deviceUUID: device.deviceUUID,
        });
        await Device.create({
          groupData: groupData._id,
          deviceId: deviceMapper.deviceId,
          temp: device.temp,
        });
      }
      return groupData;
    },
  },

  Company: {
    groups: async ({ name }, args, _, info) => {
      const groups = await UserGroup.find({ user: name }).exec();
      return groups;
    },
  },
  UserGroup: {
    groupData: async ({ _id }, { limit = 5000 }, _, info) => {
      let groupData = await GroupData.find({ group: _id })
        .sort({ date: -1 })
        .limit(limit)
        .exec();
      return groupData;
    },
  },
  GroupData: {
    devices: async ({ _id }, args, _, info) => {
      let devices = await Device.find({ groupData: _id }).exec();
      return devices;
    },
  },
};
