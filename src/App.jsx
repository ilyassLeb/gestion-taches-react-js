import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css"; 




const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null); 

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
    if (editingTask) {
      console.error("Une tâche est en cours d'édition. Utilisez 'Mettre à jour'.");
      return;
    }
  
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    const taskToAdd = { ...newTask, status: newTask.status || "à faire" };
  
    axios
      .post("http://localhost:5000/tasks", taskToAdd)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setNewTask({ title: "", description: "", status: "à faire" });
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de la tâche :", error)
      );
  };
  
  const updateTask = () => {
    if (!editingTask) return;
  
    const updatedTask = { ...editingTask, ...newTask };
  
    axios
      .put(`http://localhost:5000/tasks/${editingTask._id}`, updatedTask)
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTask._id ? { ...task, ...response.data } : task
          )
        );
        setNewTask({ title: "", description: "", status: "à faire" });
        setEditingTask(null);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de la tâche :", error)
      );
  };
  
  

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression de la tâche :", error)
      );
  };

  // const updateTask = (id, updates) => {
  //   axios
  //     .put(`http://localhost:5000/tasks/${id}`, updates)
  //     .then((response) => {
  //       setTasks((prevTasks) =>
  //         prevTasks.map((task) =>
  //           task._id === id ? { ...task, ...response.data } : task
  //         )
  //       );
  //     })
  //     .catch((error) =>
  //       console.error("Erreur lors de la mise à jour de la tâche :", error)
  //     );
  // };
  const selectTaskToEdit = (task) => {
    setNewTask({ title: task.title, description: task.description }); // Préremplit le formulaire
    setEditingTask(task); // Définit la tâche en cours d'édition
  };

  const updateTaskStatus = (taskId, status) => {
    axios
      .put(`http://localhost:5000/tasks/${taskId}`, { status }) // Met à jour uniquement le statut de la tâche
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: response.data.status } : task
          )
        );
      })
      .catch((error) => console.error("Erreur lors de la mise à jour du statut de la tâche :", error));
  };

  return (
    <div className="app-container">
      <h1>Gestion des Tâches</h1>

      <TaskForm
  newTask={newTask}
  setNewTask={setNewTask}
  onAdd={addTask}
  onUpdate={() => updateTask(editingTask._id, newTask)}
  isEditing={!!editingTask}
/>

<TaskList tasks={tasks} onDelete={deleteTask} onUpdate={updateTaskStatus} onEdit={selectTaskToEdit} />
    </div>
  );
};

export default App;

