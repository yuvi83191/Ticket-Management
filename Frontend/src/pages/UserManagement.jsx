import { useEffect, useState } from 'react';
import axios from '../api/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users')
      .then(res => setUsers(res.data));
  }, []);

  const changeRole = async (id, role) => {
    await axios.patch(`/admin/users/${id}/role`, { role });
    alert('Role updated');
  };

  const toggleStatus = async (id) => {
    await axios.patch(`/admin/users/${id}/status`);
    alert('Status toggled');
  };

  return (
    <div>
      <h2>User Management</h2>
      {users.map(user => (
        <div key={user._id}>
          {user.email} - {user.role}
          <button onClick={() => changeRole(user._id, 'agent')}>Make Agent</button>
          <button onClick={() => toggleStatus(user._id)}>Toggle Active</button>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
