import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.js";
import fs from "fs";

// Function to upload a file to Cloudinary
const uploadFileOnCloudinary = async (filePath) => {
  try {
    // Check if the file path is provided
    if (!filePath) {
      throw new ApiError(400, "File path is required for upload");
    }

    // Configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

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

    // Clean up the local file after successful upload
    try {
      fs.unlinkSync(filePath);
      console.log("Local file cleaned up:", filePath);
    } catch (cleanupError) {
      console.warn("Failed to clean up local file:", cleanupError.message);
    }

    // Return the result containing the secure URL
    return result;
  } catch (error) {
    // Clean up the local file even if upload fails
    try {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Local file cleaned up after error:", filePath);
      }
    } catch (cleanupError) {
      console.warn(
        "Failed to clean up local file after error:",
        cleanupError.message
      );
    }

    // Handle errors and throw an ApiError
    console.error("Cloudinary upload error:", error);
    throw new ApiError(500, "Failed to upload file to Cloudinary", error);
  }
};

export default uploadFileOnCloudinary;
