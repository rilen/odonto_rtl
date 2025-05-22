const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT UNIQUE,
    password TEXT,
    role TEXT,
    name TEXT,
    age INTEGER,
    address TEXT,
    phone TEXT,
    email TEXT,
    locked BOOLEAN DEFAULT 0
  )`);

  db.run(`CREATE TABLE login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT,
    timestamp INTEGER
  )`);

  db.run(`CREATE TABLE appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    dentist_id INTEGER,
    date TEXT,
    type TEXT,
    status TEXT,
    confirmed BOOLEAN DEFAULT 0,
    FOREIGN KEY(patient_id) REFERENCES users(id),
    FOREIGN KEY(dentist_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    amount REAL,
    status TEXT,
    method TEXT,
    receipt_number TEXT,
    date TEXT,
    FOREIGN KEY(patient_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE stock (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT,
    quantity INTEGER,
    critical_level INTEGER,
    category TEXT
  )`);

  db.run(`CREATE TABLE odontogram (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    dentist_id INTEGER,
    tooth_number INTEGER,
    condition TEXT,
    material TEXT,
    notes TEXT,
    date TEXT,
    FOREIGN KEY(patient_id) REFERENCES users(id),
    FOREIGN KEY(dentist_id) REFERENCES users(id)
  )`);
});

module.exports = db;
