import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      setUser(res.data.user);
      setMessage("Login successful");
      const role = res.data.user.role;
      if (role === "user") navigate("/userdashboard");
      if (role === "agent") navigate("/agentdashboard");
      if (role === "admin") navigate("/admindashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && (
          <p className={`text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <p className="mt-4 text-sm">
  Don’t have an account?{" "}
  <Link to="/register" className="text-blue-600 hover:underline">
    Register here
  </Link>
</p>
      </form>
    </div>
  );
}
