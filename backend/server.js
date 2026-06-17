const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { pool, initializeDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize the database tables on startup
initializeDatabase();

// Route: API Status
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Loansolutions API is running' });
});

// Route: Create a new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { fullName, email, phone, loanAmount, purpose } = req.body;

    // Validate simple required fields
    if (!fullName || !email || !phone || !loanAmount || !purpose) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const insertQuery = `
      INSERT INTO leads (full_name, email, phone, loan_amount, purpose)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    
    const values = [fullName, email, phone, loanAmount, purpose];
    const result = await pool.query(insertQuery, values);

    res.status(201).json({ 
      success: true, 
      message: 'Lead created successfully', 
      leadId: result.rows[0].id 
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
