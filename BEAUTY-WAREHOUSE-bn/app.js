import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

// My own modules
import authRoutes from "./routes/auth.js";
import router from "./routes/routes.js";
import dbConnection from "./db/connection.js";
import errorHandlingMiddleware from "./middleware/errorHandling.js";
import authenticationMiddleware from "./middleware/auth.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Global Middlewares
app.use(cors());
app.use(json());

// Public Routes
app.use("/api/v1/auth", authRoutes);
//Protected Routes
app.use("/api/v1", authenticationMiddleware,router);

// Error Middleware (must be last)
app.use(errorHandlingMiddleware);

async function start() {
  try {
    await dbConnection();
    app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
  } catch (error) {
    console.error("❌ Database connection failed");
    throw error;
  }
}

start();
