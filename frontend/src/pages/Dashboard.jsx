import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const res = await API.post("/projects", { title });

      setProjects((prev) => [res.data, ...prev]);
      setTitle("");
    } catch (err) {
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="dashboard">
      
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>🏠 My Renovation Projects</h1>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>
          Logout
        </button>
      </div>

      {/* CREATE PROJECT */}
      <form onSubmit={createProject} className="project-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project name..."
        />
        <button disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* PROJECT LIST */}
      <div className="project-grid">
        {projects.length === 0 ? (
          <p className="empty">No projects yet 🚀</p>
        ) : (
          projects.map((p) => (
            <div key={p._id} className="project-card">
              <h3>{p.title}</h3>
              <p>{p.description || "No description"}</p>

              <div className="card-actions">
                <Link to={`/projects/${p._id}`}>Open</Link>
                <button onClick={() => deleteProject(p._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}