import { useState, useEffect } from 'react';

const USERS_URL = 'https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json';

export default function List({ selectedId, onSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(USERS_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="list">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => onSelect(user)}
            className={selectedId === user.id ? 'selected' : ''}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
