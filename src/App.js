import logo from "./logo.svg";
import "./App.css";
import Search from "./pages/search";
import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./shared/header/navbar";
import Edit from "./pages/edit";
import Login from "./pages/login";
import Err from "./error-handling/Err";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/edit/:vin" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Err />} />
      </Routes>
    </div>
  );
}

export default App;
