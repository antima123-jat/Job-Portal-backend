const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Antu@2252',
  database: 'job_portal'
});

db.connect(err => {
  if (err) {
    console.log('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// POST route to submit job application
app.post('/apply', (req, res) => {
  const { name, email, coverLetter } = req.body;

  const query = 'INSERT INTO applications (name, email, coverLetter) VALUES (?, ?, ?)';
  db.query(query, [name, email, coverLetter], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error submitting application' });
    }
    res.status(200).json({ message: 'Application submitted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
