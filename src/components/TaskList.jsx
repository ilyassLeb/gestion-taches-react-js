import React from "react";
import "./TaskList.css";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
      
        <li key={task.id}>
          <div>
            <strong>{task.title}</strong> - {task.description} ({task.status})
          </div>
          <div>
            <button onClick={() => onUpdate(task._id, { status: "terminée" })}>
              Terminer
            </button>
            <button onClick={() => onDelete(task._id)}>Supprimer</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
