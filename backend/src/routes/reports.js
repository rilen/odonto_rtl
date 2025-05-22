// Salvar em: backend/src/routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const cache = require('../middleware/cache');

router.get('/patients', cache, async (req, res) => {
  const { page = 1, pageSize = 10, startDate, endDate, status } = req.query;
  const offset = (page - 1) * pageSize;
  let query = 'SELECT id, name, cpf, status FROM users WHERE role = $1';
  const params = ['patient', pageSize, offset];

  if (startDate && endDate) {
    query += ` AND created_at BETWEEN $${params.length + 1} AND $${params.length + 2}`;
    params.push(startDate, endDate);
  }
  if (status) {
    query += ` AND status = $${params.length + 1}`;
    params.push(status);
  }

  query += ' LIMIT $2 OFFSET $3';
  const { rows } = await pool.query(query, params);
  res.json(rows);
});

router.get('/payments', cache, async (req, res) => {
  const { page = 1, pageSize = 10, startDate, endDate, status } = req.query;
  const offset = (page - 1) * pageSize;
  let query = 'SELECT id, patient_id, amount, status FROM payments';
  const params = [pageSize, offset];

  if (startDate && endDate) {
    query += ` WHERE date BETWEEN $${params.length + 1} AND $${params.length + 2}`;
    params.push(startDate, endDate);
  }
  if (status) {
    query += `${startDate && endDate ? ' AND' : ' WHERE'} status = $${params.length + 1}`;
    params.push(status);
  }

  query += ' LIMIT $1 OFFSET $2';
  const { rows } = await pool.query(query, params);
  res.json(rows);
});

router.get('/surveys', cache, async (req, res) => {
  const { page = 1, pageSize = 10, startDate, endDate } = req.query;
  const offset = (page - 1) * pageSize;
  let query = 'SELECT id, patient_id, attendance, comfort, pain, confidence FROM surveys';
  const params = [pageSize, offset];

  if (startDate && endDate) {
    query += ` WHERE created_at BETWEEN $${params.length + 1} AND $${params.length + 2}`;
    params.push(startDate, endDate);
  }

  query += ' LIMIT $1 OFFSET $2';
  const { rows } = await pool.query(query, params);
  res.json(rows);
});

router.get('/maintenance', cache, async (req, res) => {
  const { page = 1, pageSize = 10, startDate, endDate } = req.query;
  const offset = (page - 1) * pageSize;
  let query = 'SELECT id, equipment, supplier, date FROM maintenance';
  const params = [pageSize, offset];

  if (startDate && endDate) {
    query += ` WHERE date BETWEEN $${params.length + 1} AND $${params.length + 2}`;
    params.push(startDate, endDate);
  }

  query += ' LIMIT $1 OFFSET $2';
  const { rows } = await pool.query(query, params);
  res.json(rows);
});

module.exports = router;
