import React, { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "./firebase"; // Import Firestore functions
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import "./style.css/TaskManager.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Fetch tasks from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTasks(taskList);
      setLoading(false);
    }, (error) => {
      setError("Failed to fetch tasks.");
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Handle task addition to Firestore
  const addTask = async () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      try {
        await addDoc(collection(db, "tasks"), newTask);
        setNewTask({ title: "", description: "" });
      } catch (error) {
        setError("Failed to add task.");
      }
    }
  };

  // Handle task deletion from Firestore
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      setError("Failed to delete task.");
    }
  };

  // Handle task update in Firestore
  const updateTask = async (id, updatedTask) => {
    try {
      await updateDoc(doc(db, "tasks", id), updatedTask);
    } catch (error) {
      setError("Failed to update task.");
    }
  };

  // Search handling
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Pagination
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="task-manager-container">
      <h1 className="title">Task Manager</h1>
      {error && <div className="error">{error}</div>}
      {showForm && (
        <TaskForm 
          tasks={tasks}
          setTasks={setTasks}
          newTask={newTask} 
          setNewTask={setNewTask} 
          editingTask={editingTask} 
          setEditingTask={setEditingTask} 
          addTask={addTask} // Pass addTask method
        />
      )}

      <TaskTable 
        tasks={tasks} 
        searchQuery={searchQuery} 
        currentPage={currentPage} 
        tasksPerPage={tasksPerPage}
        setTasks={setTasks}
        setEditingTask={setEditingTask} 
        setNewTask={setNewTask}
        handleSearchChange={handleSearchChange}
        deleteTask={deleteTask} // Pass deleteTask method
        updateTask={updateTask} // Pass updateTask method
      />
      <Pagination 
        currentPage={currentPage} 
        totalTasks={tasks.length} 
        tasksPerPage={tasksPerPage} 
        handlePageChange={handlePageChange}
      />
      {loading && <Spinner />}
    </div>
  );
};

export default TaskManager;
