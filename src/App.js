import React, { useState } from "react";
import Authentication from "./components/Authentication";
import TaskManager from "./components/TaskManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    isLoggedIn
      ? <TaskManager />
      : <Authentication onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;
