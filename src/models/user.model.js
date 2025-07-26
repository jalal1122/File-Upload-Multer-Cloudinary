import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "default.jpg",
    required: false,
  },
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  // Check if the password is modified or new
  if (!this.isModified("password")) {
    next();
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(this.password, 10);

  // Set the hashed password
  this.password = hashedPassword;

  nect();
});

// method to generate acces token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// create the User model with userSchema
const User = mongoose.model("User", userSchema);

export default User;
