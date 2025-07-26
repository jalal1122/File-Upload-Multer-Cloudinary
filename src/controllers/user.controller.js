import ApiError from "../utils/ApiError.js";
import ApiError from "../utils/ApiResponse.js";
import ApiError from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import upload from "../middleware/multer.middleware.js"

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
  // Extract user data from request body
  const { username, email, password, file } = req.body;

  // Validate user data
  if (!username || !email || !password) {
    throw new ApiError(400, "Username, email, and password are required");
  }

  // Check if user already exists
  const existingUser = await User.find({ email });

  // If user exists, throw an error
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email");
  }

  
});

// Function to login an existing user
const loginUser = asyncHandler(async (req, res) => {});

// Function to logout the user
const logoutUser = asyncHandler(async (req, res) => {});
