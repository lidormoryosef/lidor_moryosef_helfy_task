import React, { useEffect, useState } from "react";
import "./TaskModal.css";

export default function TaskModal({task,isOpen, onClose, onUpdate }) {
  const [title, setTitle] = useState(task !== null ? task.title : "");
  const [description, setDescription] = useState(task !== null ? task.description : "");
  const [priority, setPriority] = useState(task !== null ? task.priority : "low");
  useEffect(()=>{
    setTitle(task !== null ? task.title : "");
    setDescription(task !== null ? task.description : "");
    setPriority(task !== null ? task.priority : "low");
  },[task])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, priority, completed: false };
    if(task === null){
      createCard(taskData);
    }else{
      updateTask(taskData,task.id);
    }
    setTitle("");
    setDescription("");
    setPriority("low");
    onClose();
  };

  if (!isOpen) return null;
  const createCard = async(taskData) =>{
        try {
          const response = await fetch("http://localhost:4000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.status}`);
      }

      const createdTask = await response.json();
      onUpdate(createdTask);
    } catch (err) {
      console.error(err);
    }
  }
  const updateTask = async(taskData,id) =>{
        try {
        const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error(`Failed to update task: ${response.status}`);
      taskData["index"] = task["index"];
      onUpdate(taskData);

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{task === null ? "Create New Task" : "Update Task"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Priority:
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <div className="modal-buttons">
            <button type="submit"> Submit
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
