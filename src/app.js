import express from "express";
import bodyParser, { json } from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

export default app;
