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
import Proctected from "./auth/proctected";
import { useApi } from "./context/api-provider";
import AdminRules from "./pages/admin-rules";
import Gaurd from "./auth/gaurd";
import View from "./public/view";
function App() {
  const { role } = useApi();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={role ? "/search" : "/login"} />}
        />
        <Route element={<Proctected />}>
          <Route path="/search" element={<Search />} />
          <Route path="/edit/:vin" element={<Edit />} />
          <Route
            path="/admin"
            element={
              <Gaurd>
                <AdminRules />
              </Gaurd>
            }
          />
        </Route>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Err />} />
        <Route path="/unauthorised" element={<Err />} />
        <Route path="*" element={<Navigate to={"error"} />} />
        <Route path="/view/:vin" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;
