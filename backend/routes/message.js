const express = require('express');
const router = express.Router();
const connection = require('../connection'); // Import MySQL connection

// POST: Send a message
router.post('/send', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert the message into the database
  const query = `
    INSERT INTO message (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  connection.query(query, [name, email, subject, message], (err, results) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

module.exports = router;