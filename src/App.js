import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./components/Authentication";
import TaskManager from "./components/TaskManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Authentication Page */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/tasks" replace /> : <Authentication onLogin={() => setIsLoggedIn(true)} />
          }
        />
        
        {/* Task Manager Page */}
        <Route
          path="/tasks"
          element={
            isLoggedIn ? <TaskManager onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/login" replace />
          }
        />
        
        {/* Default Route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
