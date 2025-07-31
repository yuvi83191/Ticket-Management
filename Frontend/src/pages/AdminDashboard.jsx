import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users");
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await axios.patch(`http://localhost:5000/api/admin/users/${id}/role`, { role });
    fetchUsers();
  };

  const updateStatus = async (id, isActive) => {
    await axios.patch(`http://localhost:5000/api/admin/users/${id}/status`, { isActive });
    fetchUsers();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-red-700">Admin Dashboard</h2>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user._id} className="border p-4 rounded bg-white shadow-sm">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Status: {user.isActive ? "Active" : "Deactivated"}</p>

            <div className="mt-2 flex flex-wrap gap-2">
              <select
                value={user.role}
                onChange={e => updateRole(user._id, e.target.value)}
                className="border px-3 py-1 rounded"
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => updateStatus(user._id, !user.isActive)}
                className={`px-3 py-1 rounded ${
                  user.isActive ? "bg-red-600" : "bg-green-600"
                } text-white`}
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
