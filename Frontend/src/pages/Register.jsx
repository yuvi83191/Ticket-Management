import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/userContext.jsx";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const res =    await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("Registered successfully!");
      setFormData({ name: "", email: "", password: "" });
       setUser(res.data.user);
      navigate("/userdashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]  bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 w-full rounded"
          required
        />
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
          {loading ? "Registering..." : "Register"}
        </button>
        {message && (
          <p className={`text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      <p className="mt-4 text-sm">
  Already have an account?{" "}
  <Link to="/login" className="text-blue-600 hover:underline">
    Login here
  </Link>
</p>
      </form>
    
    </div>
  );
}
