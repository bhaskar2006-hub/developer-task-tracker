import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  async function loadTasks() {
    const response = await fetch(`${API}/tasks`);
    setTasks(await response.json());
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const response = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    if (response.ok) {
      setTitle("");
      setMessage("Task created successfully.");
      loadTasks();
    }
  }

  async function completeTask(id) {
    await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" })
    });
    loadTasks();
  }

  useEffect(() => {
    loadTasks().catch(() => setMessage("Start the backend first."));
  }, []);

  return (
    <main style={{maxWidth: 760, margin: "40px auto", padding: 20, fontFamily: "Arial"}}>
      <h1>Developer Task Tracker</h1>
      <p>Yuva Intern — Fundamentals and Setup</p>
      <form onSubmit={addTask} style={{display:"flex", gap:10}}>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Enter a task" style={{flex:1,padding:12}} />
        <button>Add Task</button>
      </form>
      <p>{message}</p>
      <ul>
        {tasks.map(task => (
          <li key={task._id} style={{marginBottom:12}}>
            <strong>{task.title}</strong> — {task.status}
            {task.status !== "done" &&
              <button onClick={() => completeTask(task._id)} style={{marginLeft:10}}>
                Complete
              </button>}
          </li>
        ))}
      </ul>
    </main>
  );
}
