import Truck from "./models/DeviceModel";
import User from "./models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server";

const addDate = () => {
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

    trucks: async () => {
      trucks = await Truck.find();
      return trucks;
    },
  },

  Mutation: {
    createUser: async (parent, { username, password }, info) => {
      const user = await User.create({ username, password });
      return user;
    },
    createTruck: async (root, { input }) => {
      await addDate().then((date) => {
        input.date = date;
      });
      return await Truck.create(input);
    },
  },
};
