const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // You can choose any port

// Middleware
app.use(cors()); // Allows cross-origin requests from your frontend
app.use(express.json()); // Parses incoming JSON requests

// Simulated in-memory "database"
let entries = [
  { id: 1, name: 'Alice', message: 'Hello, world!' },
  { id: 2, name: 'Bob', message: 'Hi, everyone!' },
];

// GET route to fetch all entries
app.get('/api/entries', (req, res) => {
  res.json(entries);
});

// POST route to add a new entry
app.post('/api/entries', (req, res) => {
  const newEntry = req.body;
  newEntry.id = Date.now(); // Assign a unique ID
  entries.push(newEntry); // Add the new entry to the array
  res.json(newEntry); // Send the new entry back as the response
});

// DELETE route to remove an entry by ID
app.delete('/api/entries/:id', (req, res) => {
  const entryId = parseInt(req.params.id);
  entries = entries.filter((entry) => entry.id !== entryId);
  res.sendStatus(200); // Send a success status code
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
