import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true },
  minThreshold: { type: Number },
  maxThreshold: { type: Number },
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

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
});

userSchema.pre("save", function () {
  const hashedPassword = bcrypt.hashSync(this.password, 11);
  this.password = hashedPassword;
});

const userGroupSchema = new Schema({
  user: {
    type: String,
    ref: "company",
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
  company: { type: String, require: true },
  deviceId: { type: String, require: true },
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

export const Company = mongoose.model("company", companySchema, "company");

export default {
  User,
  UserGroup,
  GroupData,
  Device,
  DeviceMapper,
  Company,
};
