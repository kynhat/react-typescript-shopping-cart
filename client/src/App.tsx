import React from "react";
import "./App.css";
// Components
import Login from "./components/Login/Login";
import SignUp from './components/SingUp/SignUp';
import HomePage from "./components/Home/HomePage";
import {   Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
