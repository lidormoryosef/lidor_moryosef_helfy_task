import React, { useRef, useEffect ,useState} from "react";
import "./TaskList.css";

export default function TaskList({tasks, setTasks,setIsModalOpen,setTask }){
  const carouselRef = useRef(null);
  const speed = 0.5;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setTasks(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let position = 0;
    let animationFrame;

    const scroll = () => {
      if (!carousel) return;

      position -= speed;
      if (carousel.firstChild && carousel.firstChild.getBoundingClientRect().right < 0) {
        carousel.appendChild(carousel.firstChild);
        position += carousel.firstChild.offsetWidth;
      }

      carousel.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [tasks]);
  const editTask = async(newtask)=>{
    setTask(newtask);
    setIsModalOpen(true);
  }
  if (!tasks.length) return <p>Tasks are empty</p>;
  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {tasks.map((task, index) => (
          <div key={index} className={`task-card ${task.completed ? "completed" : "notcompleted"}`} onClick={() => editTask(task)}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Completed: {task.completed ? "Completed" : "Pending"}</p>
            <p>createdAt: {task.createdAt}</p>
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
