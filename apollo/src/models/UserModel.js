import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  trucks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersTruck",
    },
  ],
});

userSchema.pre("save", function () {
  const hashedPassword = bcrypt.hashSync(this.password, 11);
  this.password = hashedPassword;
});

const usersTruckSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  truckName: { type: String, required: true},
  trucksData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trucksData",
    },
  ],
});

const trucksDataSchema = new Schema({
  truck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersTruck",
    required: true,
  },
  date: { type: Date, required: true },
  temp: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

export const User = mongoose.model("user", userSchema, "user");
export const UsersTruck = mongoose.model(
  "usersTruck",
  usersTruckSchema,
  "usersTruck"
);
export const TrucksData = mongoose.model(
  "trucksData",
  trucksDataSchema,
  "trucksData"
);

export default { User, UsersTruck, TrucksData };
