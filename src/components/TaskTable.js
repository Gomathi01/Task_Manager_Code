import React from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

const TaskTable = ({ tasks, searchQuery, currentPage, tasksPerPage, setTasks, setEditingTask, setNewTask ,handleSearchChange}) => {
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
        alert("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task.");
      }
    }
  };
  
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <h2>Task List</h2>
        <input
          type="text"
          placeholder="Search...."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button className="btn edit-btn" onClick={() => handleEditClick(task)}>
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="btn delete-btn" onClick={() => deleteTask(task.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
