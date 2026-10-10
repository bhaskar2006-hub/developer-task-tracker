import test from "node:test";
import assert from "node:assert/strict";
import {app} from "./src/index.js";
import {resetMemoryTasks} from "./src/routes/tasks.js";
async function withServer(run){globalThis.mongoReady=false;resetMemoryTasks();const server=app.listen(0);await new Promise(r=>server.once("listening",r));const base=`http://127.0.0.1:${server.address().port}`;try{await run(base);}finally{await new Promise((r,j)=>server.close(e=>e?j(e):r()));}}
test("Hello World endpoint",async()=>withServer(async base=>{const r=await fetch(base+"/api/hello");assert.equal(r.status,200);assert.match((await r.json()).message,/Hello World/);}));
test("health endpoint reports memory mode",async()=>withServer(async base=>{const b=await(await fetch(base+"/api/health")).json();assert.equal(b.status,"ok");assert.equal(b.database,"memory");}));
test("rejects short task title",async()=>withServer(async base=>{const r=await fetch(base+"/api/tasks",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({title:"x"})});assert.equal(r.status,400);}));
test("task CRUD lifecycle",async()=>withServer(async base=>{
 const createdResponse=await fetch(base+"/api/tasks",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({title:"Write tests",description:"Cover CRUD"})});
 assert.equal(createdResponse.status,201);const created=await createdResponse.json();
 const list=await(await fetch(base+"/api/tasks")).json();assert.ok(list.some(t=>t._id===created._id));
 const update=await fetch(base+`/api/tasks/${created._id}`,{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({status:"done"})});assert.equal(update.status,200);assert.equal((await update.json()).status,"done");
 const del=await fetch(base+`/api/tasks/${created._id}`,{method:"DELETE"});assert.equal(del.status,200);
 const after=await(await fetch(base+"/api/tasks")).json();assert.ok(!after.some(t=>t._id===created._id));
}));
test("rejects invalid status",async()=>withServer(async base=>{const r=await fetch(base+"/api/tasks/demo-1",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({status:"blocked"})});assert.equal(r.status,400);}));
test("unknown route returns 404",async()=>withServer(async base=>{const r=await fetch(base+"/missing");assert.equal(r.status,404);assert.equal((await r.json()).message,"Route not found.");}));
