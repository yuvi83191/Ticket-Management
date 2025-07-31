import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/my-tickets">My Tickets</Link>
      <Link to="/create-ticket">Create</Link>
      <Link to="/tickets">All Tickets</Link>
      <Link to="/admin/users">Admin</Link>
      <button onClick={() => localStorage.clear()}>Logout</button>
    </nav>
  );
};

export default Navbar;
