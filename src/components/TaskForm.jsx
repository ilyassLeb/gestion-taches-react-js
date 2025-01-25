import React from "react";
import "./css/TaskForm.css";

const TaskForm = ({ newTask, setNewTask, onAdd, onUpdate, isEditing }) => {
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
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      {}
      <select
        value={newTask.status || 'à faire'}
        onChange={(e) =>
          setNewTask({ ...newTask, status: e.target.value })
        }
      >
        <option value="à faire">À faire</option>
        <option value="en cours">En cours</option>
        <option value="terminée">Terminée</option>
      </select>
      
      {isEditing ? (
        <button onClick={onUpdate}>Mettre à jour</button>
      ) : (
        <button onClick={onAdd}>Ajouter</button>
      )}
    </div>
  );
};



export default TaskForm;
