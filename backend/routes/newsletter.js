const express = require('express');
const router = express.Router();
const connection = require('../connection'); // Import MySQL connection

// POST: Subscribe to the newsletter
router.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: 'Please enter your email!' });
  }

  // Insert the email into the database
  const query = `
    INSERT INTO newsletter (email)
    VALUES (?)
  `;
  connection.query(query, [email], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email is already subscribed!' });
      }
      console.error('Error subscribing to newsletter:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Subscribed Successfully!' });
  });
});

module.exports = router;