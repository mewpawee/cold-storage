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
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userGroup",
    },
  ],
  mapper: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deviceMapper",
    },
  ],
});

userSchema.pre("save", function () {
  const hashedPassword = bcrypt.hashSync(this.password, 11);
  this.password = hashedPassword;
});

const userGroupSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  groupName: { type: String, required: true },
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "groupData",
    },
  ],
  deviceMapper: [{ type: mongoose.Schema.Types.ObjectId, ref: "deviceMapper" }],
});

const groupDataSchema = new Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userGroup",
    required: true,
  },
  date: { type: Date, required: true },
  dateString: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "device" }],
});

const deviceSchema = new Schema({
  groupData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groupData",
    required: true,
  },
  deviceId: { type: String, required: true },
  temp: { type: Number, required: true },
});

const deviceMapperSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  deviceId: { type: String, require: true, unique: true },
  deviceUUID: { type: String, required: true },
});

export const User = mongoose.model("user", userSchema, "user");
export const UserGroup = mongoose.model(
  "userGroup",
  userGroupSchema,
  "userGroup"
);
export const GroupData = mongoose.model(
  "groupData",
  groupDataSchema,
  "groupData"
);
export const Device = mongoose.model("device", deviceSchema, "device");
export const DeviceMapper = mongoose.model(
  "deviceMapper",
  deviceMapperSchema,
  "deviceMapper"
);

export default { User, UserGroup, GroupData, Device, DeviceMapper };
