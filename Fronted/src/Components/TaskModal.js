import React, { useState } from "react";
import "./TaskModal.css";

export default function TaskModal({ task,isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [priority, setPriority] = useState(task ? task.priority : "low");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, priority, completed: false };
    if(!task){
      createCard(taskData);
    }else{
      updateTask(taskData,task.id);
    }
  };

  if (!isOpen) return null;
  const createCard = async(taskData) =>{
        try {
          const response = await fetch("http://localhost:5000/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.status}`);
      }

      const createdTask = await response.json();
      onCreate(createdTask);
      setTitle("");
      setDescription("");
      setPriority("low");
      onClose();
    } catch (err) {
      console.error(err);
    }
  }
  const updateTask = async(taskData,id) =>{
        try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error(`Failed to update task: ${response.status}`);

      const savedTask = await response.json();
      onCreate(savedTask);
      setTitle("");
      setDescription("");
      setPriority("low");
      onClose();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Task</h2>
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
