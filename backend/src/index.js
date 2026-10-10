import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tasksRouter from "./routes/tasks.js";
export const app = express();
app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.get("/", (_req,res)=>res.json({message:"Developer Task Tracker API is running"}));
app.get("/api/hello", (_req,res)=>res.json({message:"Hello World from Developer Task Tracker!",phase:"Practical Implementation Project"}));
app.get("/api/health", (_req,res)=>res.json({status:"ok",database:globalThis.mongoReady?"mongodb":"memory",timestamp:new Date().toISOString()}));
app.use("/api/tasks",tasksRouter);
app.use((_req,res)=>res.status(404).json({message:"Route not found."}));
app.use((error,_req,res,_next)=>{console.error(error);res.status(500).json({message:"Internal server error."});});
export async function startServer(){
 if(process.env.MONGODB_URI){try{await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:2500});globalThis.mongoReady=true;console.log("MongoDB connected.");}catch{globalThis.mongoReady=false;console.warn("MongoDB unavailable; using in-memory task storage.");}}
 const port=Number(process.env.PORT||5000);
 return app.listen(port,()=>console.log(`API listening on http://localhost:${port}`));
}
if(process.env.NODE_ENV!=="test") startServer();
