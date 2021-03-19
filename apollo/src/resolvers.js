import { User, UserGroup, GroupData, Device } from "./models/UserModel";
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

      const token = jwt.sign({ _id: user.id }, "riddlemethis", {
        expiresIn: 24 * 10 * 50,
      });

      return {
        token: token,
      };
    },
    groupData: async (
      parent,
      { groupName, startDate, endDate, limit = 5000 },
      { me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }

      if (startDate === undefined) {
        startDate = new Date();
      }
      if (endDate === undefined) {
        endDate = new Date();
      }

      const userGroup = await UserGroup.findOne({
        user: me._id,
        groupName: groupName,
      });
      const start = moment(new Date(startDate), "YYYY-MM-DD")
        .utcOffset("+0700")
        .startOf("day");
      const end = moment(new Date(endDate), "YYYY-MM-DD")
        .utcOffset("+0700")
        .endOf("day");
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
      console.log(startDate, endDate);
      return groupData;
    },
  },

  Mutation: {
    createUser: async (parent, { username, password }, info) => {
      const user = await User.create({ username, password });
      return user;
    },
    addUserGroup: async (parent, { username, groupName }, info) => {
      const user = await User.findOne({ username: username });
      return await UserGroup.create({ user: user._id, groupName: groupName });
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
        user: user._id,
        groupName: groupName,
      });
      if (!userGroup) {
        userGroup = await UserGroup.create({
          user: user._id,
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
        await Device.create({
          groupData: groupData._id,
          deviceId: device.deviceId,
          temp: device.temp,
        });
      }
      return groupData;
    },
  },
  User: {
    groups: async ({ _id }, args, _, info) => {
      const groups = await UserGroup.find({ user: _id }).exec();
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
