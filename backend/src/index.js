import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tasksRouter from "./routes/tasks.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/hello", (_req, res) => {
  res.json({
    message: "Hello World from Developer Task Tracker!",
    phase: "Fundamentals and Setup"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: globalThis.mongoReady ? "mongodb" : "memory",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/tasks", tasksRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error." });
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      globalThis.mongoReady = true;
      console.log("MongoDB connected.");
    } catch {
      globalThis.mongoReady = false;
      console.warn("MongoDB connection failed; using in-memory storage.");
    }
  }

  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
  });
}

start();
