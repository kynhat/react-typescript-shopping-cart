import React from "react";
import "./App.css";
// Components
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
// import SignUp from './components/SingUp/SignUp';
import HomePage from "./components/Home/HomePage";
import {   Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;
