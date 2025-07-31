import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Support System</h1>
      {user && (
        <div className="flex gap-4 items-center">
          {user.role === "user" && <Link to="/userdashboard">My Dashboard</Link>}
          {user.role === "agent" && <Link to="/agentdashboard">Agent Panel</Link>}
          {user.role === "admin" && <Link to="/admindashboard">Admin Control</Link>}
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
