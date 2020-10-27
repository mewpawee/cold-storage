import { User, UsersTruck, TrucksData } from "./models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";

const getDate = () => {
  return new Promise((resolve, reject) => {
    const date = new Date().toUTCString();
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
        token,
      };
    },
    trucksData: async (parent, { _id }, info) => {
      const trucksData = await TrucksData.find({ truck: _id }).exec();
      return trucksData;
    },
  },

  Mutation: {
    createUser: async (parent, { username, password }, info) => {
      const user = await User.create({ username, password });
      return user;
    },
    addUsersTruck: async (parent, { truckName }, { me }, info) => {
      return await UsersTruck.create({ user: me._id, truckName });
    },
    addTrucksData: async (parent, { truckId, temp, lat, lng }, _, info) => {
      const date = await getDate();
      return await TrucksData.create({ truck: truckId, date, temp, lat, lng });
    },
  },

  User: {
    trucks: async ({ _id }, args, _, info) => {
      const trucks = await UsersTruck.find({ user: _id }).exec();
      return trucks;
    },
  },

  UsersTruck: {
    trucksData: async ({ _id }, args, _, info) => {
      const trucksData = await TrucksData.find({ truck: _id }).exec();
      return trucksData;
    },
  },
};
