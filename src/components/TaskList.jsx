import React from "react";
import "./css/TaskList.css";

const TaskList = ({ tasks, onDelete, onUpdate, onEdit }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task._id}>
          <div>
            <strong>{task.title}</strong> - {task.description} ({task.status})
          </div>
          <div>
            <button onClick={() => onEdit(task)}>Modifier</button>
            {}
            <button onClick={() => onUpdate(task._id, "terminée")}>
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
