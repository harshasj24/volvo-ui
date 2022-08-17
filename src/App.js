import logo from "./logo.svg";
import "./App.css";
import Search from "./pages/search";
import { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Navbar from "./shared/header/navbar";
import Edit from "./pages/edit";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
