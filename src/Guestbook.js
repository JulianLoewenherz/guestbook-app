// Guestbook.js

import React, { useState } from 'react';
import './Guestbook.css';

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleAddEntry = () => {
    if (name.trim() && message.trim()) {
      const newEntry = { id: Date.now(), name, message };
      setEntries([...entries, newEntry]);
      setName('');
      setMessage('');
    }
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
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
          <li key={entry.id} className="guestbook-list-item">
            <strong>{entry.name}:</strong>
            <p>{entry.message}</p>
            <button onClick={() => handleDeleteEntry(entry.id)} className="guestbook-delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guestbook;
