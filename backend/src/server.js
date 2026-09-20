const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Developer Task Tracker API is running" });
});

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

async function getMongoUri() {
  // Try the configured URI first
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log("MongoDB connected:", process.env.MONGODB_URI);
    return;
  } catch {
    console.warn("Primary MongoDB unavailable, starting in-memory server...");
    mongoose.disconnect().catch(() => {});
  }

  // Fallback: spin up an in-memory MongoDB instance
  const { MongoMemoryServer } = require("mongodb-memory-server");
  const memServer = await MongoMemoryServer.create();
  const uri = memServer.getUri();
  await mongoose.connect(uri);
  console.log("⚡ In-memory MongoDB started (data resets on restart):", uri);
}

async function startServer() {
  try {
    await getMongoUri();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
