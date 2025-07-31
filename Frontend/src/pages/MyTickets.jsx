import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('/tickets/my')
      .then(res => setTickets(res.data))
      .catch(err => alert('Failed to load tickets'));
  }, []);

  return (
    <div>
      <h2>My Tickets</h2>
      {tickets.map(ticket => (
        <div key={ticket._id}>
          <Link to={`/tickets/${ticket._id}`}>{ticket.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
