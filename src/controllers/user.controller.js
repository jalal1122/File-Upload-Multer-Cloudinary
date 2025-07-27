import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import upload from "../middleware/multer.middleware.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";

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

  if (file) {
    // upload the profile picture to the public/temp directory
    await upload.single(file)(req, res, async (err) => {
      if (err) {
        throw new ApiError(400, err.message);
      }

      // Upload the file to Cloudinary
      const result = await uploadFileOnCloudinary(
        "../../public/temp/" + file.filename
      );

      // Create a new user instance
      const newUser = new User({
        name: username,
        email,
        password,
        profilePicture: result.secure_url, // Store the Cloudinary URL
      });

      // Save the new user to the database
      await newUser.save();

      // Respond with the created user data
      res.status(201).json(
        new ApiResponse(201, "User registered successfully", {
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
          },
        })
      );
    });
  } else {
    const user = await User.create({
      name: username,
      email,
      password,
      profilePicture: "default.jpg", // Use default profile picture if no file is uploaded
    });

    res.status(201).json(
      new ApiResponse(201, "User registered successfully", {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    );
  }
});

// Function to login an existing user
const loginUser = asyncHandler(async (req, res) => {});

// Function to logout the user
const logoutUser = asyncHandler(async (req, res) => {});

export { registerUser, loginUser, logoutUser };