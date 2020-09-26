import mongoose from "mongoose";

const Schema = mongoose.Schema;

const truckSchema = new Schema({
  owner: { type: String },
  device_id: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  temp: { type: Number },
  date: { type: Date },
});

const Truck = mongoose.model("trucks", truckSchema, "trucks");

export default Truck;
