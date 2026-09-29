import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2 },
    description: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    }
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
