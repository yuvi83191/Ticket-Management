import React, { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { useUser } from "../store/userContext.jsx";

export default function UserDashboard() {
  const { user } = useUser();
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", priority: "low" });
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTickets = async () => {
    const params = {
      page,
      status: filter.status,
      priority: filter.priority,
    };
    const res = await axios.get("http://localhost:5000/api/tickets/my", { params } ,  payload, { withCredentials: true });
    setTickets(res.data.tickets);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchTickets();
  }, [filter, page]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tickets", formData);
    setFormData({ title: "", description: "", priority: "low" });
    fetchTickets();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tickets/${id}`);
    fetchTickets();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700">Welcome, {user?.name}</h2>

      <form onSubmit={handleCreate} className="space-y-2 bg-white shadow p-4 rounded">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          placeholder="Ticket Title"
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description"
          className="border p-2 w-full"
          required
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={e => setFormData({ ...formData, priority: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create Ticket
        </button>
      </form>

      <div className="flex gap-4">
        <select
          onChange={e => setFilter({ ...filter, status: e.target.value })}
          className="border p-2"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In-Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          onChange={e => setFilter({ ...filter, priority: e.target.value })}
          className="border p-2"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket._id} className="border p-4 rounded bg-gray-50">
            <h3 className="text-xl font-semibold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <button
              onClick={() => handleDelete(ticket._id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded">
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">
          Next
        </button>
      </div>
    </div>
  );
}
