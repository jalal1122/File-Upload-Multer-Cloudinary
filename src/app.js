import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes Hanlding
app.use("/api/user", userRouter);

// Global error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });

export default app;
