import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import './style.css/Auth.css';

const Authentication = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Sign-up successful! You can now log in.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      onLogin();
    } catch (error) {
      console.error("Error:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login / Sign-Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="password-container">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"} visibility-icon`}
          onClick={togglePasswordVisibility}
        ></i>
      </div>
    <div className="button-container">
    <button onClick={handleSignUp}>Sign Up</button>
    <button onClick={handleLogin}>Log In</button>
  </div>
      <p>{message}</p>
    </div>
  );
};

export default Authentication;
