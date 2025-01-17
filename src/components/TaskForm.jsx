import React from "react";
import "./TaskForm.css";

const TaskForm = ({ newTask, setNewTask, onAdd }) => {
  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Titre"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button onClick={onAdd}>Ajouter</button>
    </div>
  );
};

export default TaskForm;
