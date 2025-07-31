
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTicket from './pages/CreateTicket';
import MyTickets from './pages/MyTickets';
import AllTickets from './pages/AllTickets';
import TicketDetails from './pages/TicketDetails';
import EditTicket from './pages/EditTicket';
import UserManagement from './pages/UserManagement';
import Navbar from './components/Navbar';


import './App.css'

function App() {
  

  return (
    <div>
       <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/tickets" element={<AllTickets />} />
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/tickets/:id/edit" element={<EditTicket />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Routes>
    </div>
  )
}

export default App
