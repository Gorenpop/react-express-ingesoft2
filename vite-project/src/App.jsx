import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/personas');
        const data = await res.json();
        setUsers(data.users);  // Aquí actualizamos el estado con los usuarios recibidos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>About</h2>
        <p>Welcome to the home page</p>
        <h1>Users:</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.nombre}</li> 
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
