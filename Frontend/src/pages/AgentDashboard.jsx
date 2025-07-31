import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ status: "", priority: "", assignedTo: "" });

  const fetchTickets = async () => {
    const params = { page, status: filter.status, priority: filter.priority };
    const res = await axios.get("http://localhost:5000/api/tickets", { params });
    setTickets(res.data.tickets);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchTickets();
  }, [filter, page]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tickets/${id}`);
    fetchTickets();
  };

  const handleEdit = (ticket) => {
    setEditMode(ticket._id);
    setEditData({
      status: ticket.status,
      priority: ticket.priority,
      assignedTo: ticket.assignedTo || "",
    });
  };

  const submitEdit = async (id) => {
    await axios.patch(`http://localhost:5000/api/tickets/${id}`, editData);
    setEditMode(null);
    setEditData({ status: "", priority: "", assignedTo: "" });
    fetchTickets();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center text-purple-700">Agent Dashboard</h2>

      <div className="flex gap-4">
        <select onChange={e => setFilter({ ...filter, status: e.target.value })} className="border p-2">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In-Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select onChange={e => setFilter({ ...filter, priority: e.target.value })} className="border p-2">
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket._id} className="border p-4 rounded bg-white shadow-sm">
            <h3 className="text-xl font-semibold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Assigned To: {ticket.assignedTo || "Unassigned"}</p>
            {editMode === ticket._id ? (
              <div className="space-y-2 mt-2">
                <select
                  value={editData.status}
                  onChange={e => setEditData({ ...editData, status: e.target.value })}
                  className="border p-2 w-full"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={editData.priority}
                  onChange={e => setEditData({ ...editData, priority: e.target.value })}
                  className="border p-2 w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="text"
                  placeholder="Assigned To"
                  value={editData.assignedTo}
                  onChange={e => setEditData({ ...editData, assignedTo: e.target.value })}
                  className="border p-2 w-full"
                />
                <button onClick={() => submitEdit(ticket._id)} className="bg-green-600 text-white px-4 py-1 rounded w-full">
                  Update Ticket
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <button onClick={() => handleEdit(ticket)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(ticket._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            )}
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
