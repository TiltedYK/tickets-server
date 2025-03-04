const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
// Change credentials to match your MySQL DB
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

// Example route: GET /purchase?eventId=10 => increments billets_vendus
app.get('/purchase', async (req, res) => {
  const eventId = req.query.eventId;
  if (!eventId) return res.status(400).send('<h1 style="color:white;">No eventId</h1>');
  try {
    await pool.query(
      'UPDATE evenement SET billets_vendus = billets_vendus + 1 WHERE id_evenement = ?',
      [eventId]
    );
    res.send('<h1 style="color:white;">Ticket purchased!</h1>');
  } catch (err) {
    console.error(err);
    res.status(500).send('<h1 style="color:white;">Server error</h1>');
  }
});


// Listen on port 3000 or a platform’s assigned port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
