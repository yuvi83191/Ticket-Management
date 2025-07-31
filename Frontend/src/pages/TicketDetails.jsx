import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`/tickets/${id}`)
      .then(res => setTicket(res.data))
      .catch(err => alert('Failed to fetch ticket'));
  }, [id]);

  if (!ticket) return <p>Loading...</p>;

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <Link to={`/tickets/${ticket._id}/edit`}>Edit</Link>
    </div>
  );
};

export default TicketDetails;
