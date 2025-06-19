import { model, Schema } from "mongoose";
import validator from "validator";
import { IAddress, IUser } from "./../interfaces/user.interface";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, `You don not have first name ?`],
      trim: true,
      minlength: [3, `First name must be at least 3 characters, got {VALUE}`],
      maxlength: [
        20,
        `First name must be less than 20 characters, got {VALUE}`,
      ],
    },
    lastName: {
      type: String,
      required: [true, `You do not have last name ?`],
      trim: true,
      minlength: [3, `Last name must be at least 3 characters, got {VALUE}`],
      maxlength: [20, `Last name must be less than 20 characters, got {VALUE}`],
    },
    age: {
      type: Number,
      required: true,
      min: [18, `Age must be at least 18, got {VALUE}`],
      max: [60, `Age must be less than 60, got {VALUE}`],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, `Email must be unique`],
      lowercase: true,
      // validate: {
      //   validator: function (v) {
      //     // regex for email validation
      //     return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      //   },
      //   message: function (props) {
      //     return `${props.value} is not a valid email`;
      //   },
      // },
      validate: [validator.isEmail, `Invalid email format {VALUE}`],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: `Role must be one of USER, ADMIN, or SUPERADMIN, got {VALUE}`,
      },
      default: "USER",
    },
    address: { type: addressSchema },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
