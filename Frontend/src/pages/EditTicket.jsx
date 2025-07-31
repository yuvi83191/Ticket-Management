import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

const EditTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/tickets/${id}`)
      .then(res => setTicket(res.data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/tickets/${id}`, ticket);
      navigate('/my-tickets');
    } catch {
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Ticket</h2>
      <input value={ticket.title || ''} onChange={e => setTicket({ ...ticket, title: e.target.value })} />
      <textarea value={ticket.description || ''} onChange={e => setTicket({ ...ticket, description: e.target.value })} />
      <button>Update</button>
    </form>
  );
};

export default EditTicket;
