import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import validator from "validator";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "./../interfaces/user.interface";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
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
// instance method for hashing password
userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// static method for hashing password
userSchema.static("hashPassword", async function (plainPassword) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// ==> PRE HOOKS <==

// Pre hook -> Document middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

// Pre-Hook -> Query middleware
userSchema.pre("find", async function (next) {
  console.log(this);
  next();
});

// ==> POST HOOKS <==

// post hook -> Document middleware
userSchema.post("save", function (doc, next) {
  console.log("Inside post save");
  console.log(`User ${doc.email} has been created successfully`);

  next();
});

// post hook -> query middle
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
    console.log(`User ${doc.email} has been deleted successfully`);
  }
  next();
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
