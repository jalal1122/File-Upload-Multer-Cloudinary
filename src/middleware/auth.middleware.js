import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  // get the token from the authorization header or cookies
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

  // if no token is found, throw an error
  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }

  // verify the token
  const docoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // if the token is invalid or expired, throw an error
  if (!docoded) {
    throw new ApiError(401, "Invalid access token");
  }

  // find the user by id from the decoded token
  const user = await User.findById(docoded.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // attach the user to the request object
  req.user = user;
  next();
});

export default authMiddleware;
