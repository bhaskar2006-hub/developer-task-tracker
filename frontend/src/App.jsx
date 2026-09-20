import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      alert("Could not load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await api.post("/tasks", {
        title,
        description
      });

      setTasks((current) => [response.data, ...current]);
      setTitle("");
      setDescription("");
    } catch (error) {
      alert("Could not create task.");
    }
  }

  async function toggleTask(task) {
    try {
      const response = await api.patch(`/tasks/${task._id}`, {
        completed: !task.completed
      });

      setTasks((current) =>
        current.map((item) =>
          item._id === task._id ? response.data : item
        )
      );
    } catch (error) {
      alert("Could not update task.");
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((current) => current.filter((task) => task._id !== id));
    } catch (error) {
      alert("Could not delete task.");
    }
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">INTERNSHIP PHASE 1</p>
        <h1>Developer Task Tracker</h1>
        <p className="subtitle">
          A small full-stack project for learning professional development workflow.
        </p>
      </header>

      <section className="card">
        <h2>Add a task</h2>
        <form onSubmit={addTask}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Learn Git branches"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Optional description"
            rows="3"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="card">
        <div className="section-heading">
          <h2>My Tasks</h2>
          <span>{tasks.length} total</span>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add your first one above.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article className="task" key={task._id}>
                <div className="task-content">
                  <button
                    className={`check ${task.completed ? "completed" : ""}`}
                    onClick={() => toggleTask(task)}
                    aria-label="Toggle task"
                  >
                    {task.completed ? "✓" : "○"}
                  </button>
                  <div>
                    <h3 className={task.completed ? "done" : ""}>
                      {task.title}
                    </h3>
                    {task.description && <p>{task.description}</p>}
                  </div>
                </div>

                <button
                  className="delete"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
