import React from 'react';
import './TasksPage.css';
import { useState } from "react";
import TaskList from '../Components/TaskList';
import TaskModal from '../Components/TaskModal';

export default function TasksPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    
    const createTask = (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    };
    const updateTask = (newTask) => {
      console.log(newTask);
      setTasks(prevItems => {
        const newTasks = [...prevItems];
        newTasks[newTask["index"]] = newTask;
        return newTasks;
  });
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
        onClose={() => {setIsModalOpen(false); setTask(null);}}
        onUpdate={task === null ? createTask : updateTask}
      />
    </>
  );
}
