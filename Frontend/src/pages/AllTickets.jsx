import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('/tickets')
      .then(res => setTickets(res.data))
      .catch(err => alert('Failed to fetch all tickets'));
  }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      {tickets.map(ticket => (
        <div key={ticket._id}>
          <Link to={`/tickets/${ticket._id}`}>{ticket.title} - {ticket.status}</Link>
        </div>
      ))}
    </div>
  );
};

export default AllTickets;
