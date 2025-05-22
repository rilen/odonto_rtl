const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE,
    password TEXT,
    role VARCHAR(50),
    name TEXT,
    age INTEGER,
    address TEXT,
    phone TEXT,
    email TEXT,
    locked BOOLEAN DEFAULT FALSE
  );

  CREATE TABLE IF NOT EXISTS login_attempts (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14),
    timestamp BIGINT
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(id),
    dentist_id INTEGER REFERENCES users(id),
    date TEXT,
    type TEXT,
    status TEXT,
    confirmed BOOLEAN DEFAULT FALSE
  );

  CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(id),
    amount REAL,
    status TEXT,
    method TEXT,
    receipt_number TEXT,
    date TEXT
  );

  CREATE TABLE IF NOT EXISTS stock (
    id SERIAL PRIMARY KEY,
    item_name TEXT,
    quantity INTEGER,
    critical_level INTEGER,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS odontogram (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(id),
    dentist_id INTEGER REFERENCES users(id),
    tooth_number INTEGER,
    condition TEXT,
    material TEXT,
    notes TEXT,
    date TEXT
  );
`);

module.exports = pool;
