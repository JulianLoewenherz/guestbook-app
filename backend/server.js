require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // You can choose any port

// MongoDB Connection using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Entry Schema and Model
const entrySchema = new mongoose.Schema({
  name: String,
  message: String,
});

const Entry = mongoose.model('Entry', entrySchema);

// Middleware
app.use(cors());
app.use(express.json());

// GET route to fetch all entries
app.get('/api/entries', (req, res) => {
  console.log('GET request received at /api/entries');
  Entry.find((err, entries) => {
    if (err) {
      console.error('Error fetching entries:', err);
      return res.status(500).send(err);
    }
    res.json(entries);
  });
});

// POST route to add a new entry
app.post('/api/entries', (req, res) => {
  console.log('POST request received at /api/entries');
  console.log('Request body:', req.body);

  const newEntry = new Entry(req.body);
  newEntry.save()
    .then(savedEntry => res.json(savedEntry))
    .catch(err => {
      console.error('Error saving entry:', err);
      res.status(500).send(err);
    });
});

// DELETE route to remove an entry by ID
app.delete('/api/entries/:id', (req, res) => {
  const entryId = req.params.id;
  console.log('DELETE request received for id:', entryId);

  Entry.findByIdAndDelete(entryId)
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error('Error deleting entry:', err);
      res.status(500).send(err);
    });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
