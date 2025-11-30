import { useState } from 'react';
import List from './components/List';
import Details from './components/Details';
import './App.css';

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="app">
      <List selectedId={selectedUser?.id} onSelect={setSelectedUser} />
      <Details info={selectedUser} />
    </div>
  );
}
