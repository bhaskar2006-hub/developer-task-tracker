import express from "express";
import { Task } from "../models/Task.js";
const router=express.Router();
const initial=()=>[{_id:"demo-1",title:"Set up Git",description:"Initialize the repository.",status:"done",createdAt:new Date().toISOString()}];
let memoryTasks=initial();
const statuses=new Set(["todo","in-progress","done"]);
const usesMongo=()=>Boolean(globalThis.mongoReady);
router.get("/",async(_req,res,next)=>{try{res.json(usesMongo()?await Task.find().sort({createdAt:-1}):memoryTasks);}catch(e){next(e);}});
router.post("/",async(req,res,next)=>{try{
 const {title,description="",status="todo"}=req.body??{};
 if(typeof title!=="string"||title.trim().length<2)return res.status(400).json({message:"Title must contain at least 2 characters."});
 if(typeof description!=="string"||!statuses.has(status))return res.status(400).json({message:"Description or status is invalid."});
 const payload={title:title.trim(),description:description.trim(),status};
 if(usesMongo())return res.status(201).json(await Task.create(payload));
 const task={_id:`task-${Date.now()}-${Math.random().toString(16).slice(2,8)}`,...payload,createdAt:new Date().toISOString()};
 memoryTasks.unshift(task);return res.status(201).json(task);
 }catch(e){next(e);}});
router.put("/:id",async(req,res,next)=>{try{
 const {title,description,status}=req.body??{},updates={};
 if(title!==undefined){if(typeof title!=="string"||title.trim().length<2)return res.status(400).json({message:"Title must contain at least 2 characters."});updates.title=title.trim();}
 if(description!==undefined){if(typeof description!=="string")return res.status(400).json({message:"Description must be a string."});updates.description=description.trim();}
 if(status!==undefined){if(!statuses.has(status))return res.status(400).json({message:"Status must be todo, in-progress, or done."});updates.status=status;}
 if(!Object.keys(updates).length)return res.status(400).json({message:"Provide at least one field to update."});
 if(usesMongo()){const task=await Task.findByIdAndUpdate(req.params.id,updates,{new:true,runValidators:true});if(!task)return res.status(404).json({message:"Task not found."});return res.json(task);}
 const i=memoryTasks.findIndex(t=>t._id===req.params.id);if(i<0)return res.status(404).json({message:"Task not found."});memoryTasks[i]={...memoryTasks[i],...updates};return res.json(memoryTasks[i]);
 }catch(e){next(e);}});
router.delete("/:id",async(req,res,next)=>{try{
 if(usesMongo()){const task=await Task.findByIdAndDelete(req.params.id);if(!task)return res.status(404).json({message:"Task not found."});return res.json({message:"Task deleted successfully."});}
 const n=memoryTasks.length;memoryTasks=memoryTasks.filter(t=>t._id!==req.params.id);if(n===memoryTasks.length)return res.status(404).json({message:"Task not found."});return res.json({message:"Task deleted successfully."});
 }catch(e){next(e);}});
export function resetMemoryTasks(){memoryTasks=initial();}
export default router;
