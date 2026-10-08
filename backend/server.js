const express = require('express');
const path = require('path');
const https = require('https');
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

// Route: Health Check (for keep-alive)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Route: Create a new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { fullName, email, phone, loanAmount, purpose, city, pincode, employment, promoCode } = req.body;

    // Validate required fields (email and promoCode are optional)
    if (!fullName || !phone || !loanAmount || !purpose || !pincode) {
      return res.status(400).json({ error: 'Name, phone, loan amount, loan type, and pincode are required.' });
    }

    // Clean loan amount: remove commas, ₹ currency symbols, spaces
    const cleanAmount = String(loanAmount).replace(/[^0-9.]/g, '');
    if (!cleanAmount || isNaN(Number(cleanAmount)) || Number(cleanAmount) <= 0) {
      return res.status(400).json({ error: 'Please enter a valid numeric loan amount.' });
    }

    const insertQuery = `
      INSERT INTO leads (full_name, email, phone, loan_amount, purpose, address, pincode, employment, promo_code)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
    `;
    
    const values = [
      String(fullName).trim(),
      email ? String(email).trim() : '',
      String(phone).trim(),
      Number(cleanAmount),
      String(purpose).trim(),
      city ? String(city).trim() : '',
      String(pincode).trim(),
      employment ? String(employment).trim() : '',
      promoCode ? String(promoCode).trim() : ''
    ];
    const result = await pool.query(insertQuery, values);

    res.status(201).json({ 
      success: true, 
      message: 'Lead created successfully', 
      leadId: result.rows[0].id 
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route for React Router (must be AFTER API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Keep the server alive by pinging the /health endpoint every 5 minutes
  const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL || 'https://lead-genration-1.onrender.com/health';
  setInterval(() => {
    https.get(KEEP_ALIVE_URL, (res) => {
      console.log(`Keep-alive ping sent to ${KEEP_ALIVE_URL}. Status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`Error during keep-alive ping: ${err.message}`);
    });
  }, 5 * 60 * 1000); // 5 minutes
});
