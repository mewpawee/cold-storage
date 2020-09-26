import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
      type: String,
      required: true,
      unique: true,
    },
    password:{type: String, required: true,},
});

userSchema.pre('save', function(){
    const hashedPassword = bcrypt.hashSync(this.password, 11);
    this.password = hashedPassword;
  });

const User = mongoose.model("user", userSchema, "user");

export default User;