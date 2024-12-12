import express from "express";
import dotenv from "dotenv";
import bookRouter from "./routes/books.js";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/', bookRouter);

export default app;