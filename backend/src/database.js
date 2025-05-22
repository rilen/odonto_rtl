// Salvar em: backend/src/database.js
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
    locked BOOLEAN DEFAULT FALSE,
    two_factor_secret TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_users_cpf ON users(cpf);

  CREATE TABLE IF NOT EXISTS login_attempts (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(14),
    timestamp BIGINT
  );
  CREATE INDEX IF NOT EXISTS idx_login_attempts_cpf ON login_attempts(cpf);

  CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(id),
    dentist_id INTEGER REFERENCES users(id),
    date TEXT,
    type TEXT,
    status TEXT,
    confirmed BOOLEAN DEFAULT FALSE
  );
  CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);

  CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES users(id),
    amount REAL,
    status TEXT,
    method TEXT,
    receipt_number TEXT,
    date TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_payments_patient_id ON payments(patient_id);

  CREATE TABLE IF NOT EXISTS stock (
    id SERIAL PRIMARY KEY,
    item_name TEXT,
    quantity INTEGER,
    critical_level INTEGER,
    category TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_stock_item_name ON stock(item_name);

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
  CREATE INDEX IF NOT EXISTS idx_odontogram_patient_id ON odontogram(patient_id);

  CREATE TABLE IF NOT EXISTS maintenance (
    id SERIAL PRIMARY KEY,
    equipment TEXT,
    supplier TEXT,
    date TEXT
  );

  CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    cpf VARCHAR(14) UNIQUE,
    address TEXT,
    phone TEXT,
    email TEXT
  );

  CREATE TABLE IF NOT EXISTS surveys (
    id SERIAL PRIMARY KEY,
    appointment_id INTEGER REFERENCES appointments(id),
    patient_id INTEGER REFERENCES users(id),
    attendance INTEGER,
    comfort INTEGER,
    pain INTEGER,
    confidence INTEGER
  );

    CREATE TABLE IF NOT EXISTS push_subscriptions (
    user_id INTEGER PRIMARY KEY REFERENCES users(id),
    subscription TEXT
  );
  
`);

module.exports = pool;
