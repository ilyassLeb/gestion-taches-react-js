import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css"; 




const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Récupérer les tâches depuis le backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des tâches :", error)
      );
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: "", description: "", status: "à faire" });
      })
      .catch((error) => console.error("Erreur lors de l'ajout de la tâche :", error));
  };

  // Supprimer une tâche
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        // Mise à jour des tâches sans la tâche supprimée
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression de la tâche :", error)
      );
  };

  // Mettre à jour une tâche
  const updateTask = (id, updates) => {
    axios
      .put(`http://localhost:5000/tasks/${id}`, updates)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, ...response.data } : task
          )
        );
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de la tâche :", error)
      );
  };

  return (
    <div className="app-container">
      <h1>Gestion des Tâches</h1>

      <TaskForm newTask={newTask} setNewTask={setNewTask} onAdd={addTask} />
      <TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
    </div>
  );
};

export default App;

