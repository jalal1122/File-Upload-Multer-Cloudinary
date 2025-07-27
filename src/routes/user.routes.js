import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", upload.single("profilePicture"), registerUser);

export default userRouter;
