import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter name!"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email!"],
      trim: true,
    },
     password: {
      type: String,
      required: [true, "Please Enter Password!"],
      trim: true,
    },
    userType: {
      type: String,
      enum: ["STUDENT", "ADMIN"],
      trim: true,
      default : "STUDENT"
    },
    credits: {
      type: Number,
      default: 30,
      required: true,
      trim: true,
    },
    location : {
        type : String ,
         required : [true , "Enter Your Location!"]
    }
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
