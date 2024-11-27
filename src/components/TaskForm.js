import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

const TaskForm = ({ tasks, setTasks, newTask, setNewTask, editingTask, setEditingTask }) => {
  const addTask = async () => {
    try {
      const response = await axios.post(API_URL, newTask);
      setTasks([response.data, ...tasks]);
      setNewTask({ title: "", description: "" });
      alert("Task Added Successfully");
    } catch {
      alert("Failed to add task.");
    } 
  };
  

  const updateTask = async (id) => {
    const updatedTask = { ...newTask };
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
      setNewTask({ title: "", description: "" });
      setEditingTask(null);
      alert("Task Updated Successfully");
    } catch (error) {
      console.error("Update Task Error:", error);
      alert("Failed to update task.");
    }
  };
  
  useEffect(() => {
    if (editingTask) {
      setNewTask({
        title: editingTask.title || "",
        description: editingTask.description || "",
      });
    } else {
      setNewTask({ title: "", description: "" });
    }
  }, [editingTask]);
  return (
    <>
      <h2 style={{ textAlign: "left" }}>{editingTask ? "Edit Task" : "Add New Task"}</h2>
      <div className="form-container">
        <input
          type="text"
          className="input"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          className="input"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        {editingTask ? (
          <button className="btn update-btn" onClick={() => updateTask(editingTask.id)}>
            UpdateTask
          </button>
        ) : (
          <button className="btn add-btn" onClick={addTask}>
            AddTask
          </button>
        )}
      </div>
    </>
  );
};

export default TaskForm;
