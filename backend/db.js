const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const initializeDatabase = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      loan_amount NUMERIC NOT NULL,
      purpose VARCHAR(255) NOT NULL,
      pincode VARCHAR(20),
      address VARCHAR(255),
      employment VARCHAR(100),
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const alterText = `
    ALTER TABLE leads 
    ADD COLUMN IF NOT EXISTS pincode VARCHAR(20),
    ADD COLUMN IF NOT EXISTS address VARCHAR(255),
    ADD COLUMN IF NOT EXISTS employment VARCHAR(100);
  `;
  
  try {
    await pool.query(queryText);
    await pool.query(alterText);
    console.log("Database initialized: 'leads' table is ready with updated schema.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

module.exports = {
  pool,
  initializeDatabase
};
