import express from "express";
import { Task } from "../models/Task.js";

const router = express.Router();
let memoryTasks = [
  { _id: "demo-1", title: "Set up Git", description: "Initialize the repository.", status: "done" }
];

const mongoReady = () => Boolean(globalThis.mongoReady);

router.get("/", async (_req, res, next) => {
  try {
    const tasks = mongoReady()
      ? await Task.find().sort({ createdAt: -1 })
      : memoryTasks;
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description = "", status = "todo" } = req.body;
    if (!title || title.trim().length < 2) {
      return res.status(400).json({ message: "Title must contain at least 2 characters." });
    }

    if (mongoReady()) {
      const task = await Task.create({ title, description, status });
      return res.status(201).json(task);
    }

    const task = {
      _id: `demo-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status
    };
    memoryTasks.unshift(task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (mongoReady()) {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!task) return res.status(404).json({ message: "Task not found." });
      return res.json(task);
    }

    const index = memoryTasks.findIndex(t => t._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Task not found." });
    memoryTasks[index] = { ...memoryTasks[index], ...req.body };
    res.json(memoryTasks[index]);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (mongoReady()) {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found." });
      return res.json({ message: "Task deleted successfully." });
    }

    const before = memoryTasks.length;
    memoryTasks = memoryTasks.filter(t => t._id !== req.params.id);
    if (memoryTasks.length === before) {
      return res.status(404).json({ message: "Task not found." });
    }
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
});

export default router;
