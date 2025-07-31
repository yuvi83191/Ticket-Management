import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tickets', { title, description, priority });
      navigate('/my-tickets');
    } catch (err) {
      alert(err.response?.data?.message || 'Ticket creation failed');
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create Ticket</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button>Create</button>
    </form>
  );
};

export default CreateTicket;
