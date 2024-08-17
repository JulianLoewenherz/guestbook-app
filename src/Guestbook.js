import React, { useState, useEffect } from 'react';
import './Guestbook.css';

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Replace 'http://localhost:3000' with your Heroku backend URL
  const API_URL = 'https://guestbook-app-backend-afd8f1dcec33.herokuapp.com/api/entries';

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddEntry = () => {
    if (name.trim() && message.trim()) {
      const newEntry = { name, message };

      // Send the new entry to the backend
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      })
        .then((response) => response.json())
        .then((data) => {
          setEntries([...entries, data]);
          console.log('Entry added:', data);
        })
        .catch((error) => console.error('Error adding entry:', error));

      setName('');
      setMessage('');
    }
  };

  const handleDeleteEntry = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setEntries(entries.filter((entry) => entry._id !== id));
        console.log('Entry deleted:', id);
      })
      .catch((error) => console.error('Error deleting entry:', error));
  };

  return (
    <div className="guestbook-container">
      <h2>Guestbook</h2>
      <div className="guestbook-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="guestbook-input"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="guestbook-textarea"
        />
        <button onClick={handleAddEntry} className="guestbook-button">Add Entry</button>
      </div>
      <ul className="guestbook-list">
        {entries.map((entry) => (
          <li key={entry._id} className="guestbook-list-item">
            <strong>{entry.name}:</strong>
            <p>{entry.message}</p>
            <button onClick={() => handleDeleteEntry(entry._id)} className="guestbook-delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guestbook;
