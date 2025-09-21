import React from 'react';
import './TasksPage.css';
import { useState } from "react";
import TaskList from '../Components/TaskList';
import TaskModal from '../Components/TaskModal';

export default function TasksPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    
    const handleTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };
  return (
    <>    
      <div className="tasks-page">
        <h1 className="tasks-title">My Tasks</h1>
        <div className="tasklist-container">
          <TaskList tasks={tasks} setTasks = {setTasks} setIsModalOpen = {setIsModalOpen} setTask={setTask} />
        </div>
      </div>
<button onClick={() => setIsModalOpen(true)}>Add Task</button>

      <TaskModal
      task ={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleTask}
      />
    </>
  );
}
