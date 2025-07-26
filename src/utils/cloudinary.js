import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary
const uploadFileOnCloudinary = async (filePath) => {
  try {
    // Check if the file path is provided
    if (!filePath) {
      throw new ApiError(400, "File path is required for upload");
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Check if the upload was successful
    if (!result || !result.secure_url) {
      throw new ApiError(500, "File upload failed");
    }

    // Log the successful upload
    console.log("File uploaded successfully:", result.secure_url);

    // Return the result containing the secure URL
    return result;
  } catch (error) {
    // Handle errors and throw an ApiError
    throw new ApiError(500, "Failed to upload file to Cloudinary", error);
  }
};

export default uploadFileOnCloudinary;
