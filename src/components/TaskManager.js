import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import Pagination from "./Pagination";

import Spinner from "./Spinner";
import "./style.css/TaskManager.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const API_URL = "http://localhost:3000/tasks";

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
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data); 
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

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
