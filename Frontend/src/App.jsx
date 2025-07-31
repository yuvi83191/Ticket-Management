import { Routes, Route, Navigate , useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AgentDashboard from "./pages/AgentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { useUser } from "./store/userContext.jsx";
import Navbar from "./components/Navbar.jsx";
import React from "react";

function App() {
const { user } = useUser();
 const location = useLocation();
  const showNavbar = ["/login", "/register", "/"].includes(location.pathname) || location.pathname.includes("dashboard");
  return (
    <>
    {showNavbar && <Navbar />}
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/userdashboard"
        element={user?.role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/agentdashboard"
        element={user?.role === "agent" ? <AgentDashboard /> : <Navigate to="/login" />}
      />
       <Route
        path="/admindashboard"
        element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
   </>
  );
}

export default App;