-- Salvar em: backend/scripts/database_migration.sql

-- Drop tables if they exist to ensure a clean migration
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS odontogram;
DROP TABLE IF EXISTS surveys;
DROP TABLE IF EXISTS maintenance;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'secretary', 'dentist', 'patient')),
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  google_access_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create appointments table
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(id),
  dentist_id INTEGER NOT NULL REFERENCES users(id),
  date TIMESTAMP NOT NULL,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  confirmed BOOLEAN DEFAULT FALSE,
  google_event_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'paid', 'failed')),
  method VARCHAR(50),
  receipt_number VARCHAR(100),
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stock table
CREATE TABLE stock (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  critical_level INTEGER NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create maintenance table
CREATE TABLE maintenance (
  id SERIAL PRIMARY KEY,
  equipment VARCHAR(255) NOT NULL,
  supplier VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create surveys table
CREATE TABLE surveys (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(id),
  attendance INTEGER CHECK (attendance BETWEEN 1 AND 5),
  comfort INTEGER CHECK (comfort BETWEEN 1 AND 5),
  pain INTEGER CHECK (pain BETWEEN 1 AND 5),
  confidence INTEGER CHECK (confidence BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create odontogram table
CREATE TABLE odontogram (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(id),
  dentist_id INTEGER NOT NULL REFERENCES users(id),
  tooth_number INTEGER NOT NULL,
  condition VARCHAR(100) NOT NULL,
  material VARCHAR(100),
  notes TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  details TEXT,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_cpf ON users(cpf);
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_dentist_id ON appointments(dentist_id);
CREATE INDEX idx_payments_patient_id ON payments(patient_id);
CREATE INDEX idx_surveys_patient_id ON surveys(patient_id);
CREATE INDEX idx_odontogram_patient_id ON odontogram(patient_id);
CREATE INDEX idx_odontogram_dentist_id ON odontogram(dentist_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
