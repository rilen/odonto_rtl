const express = require('express');
const router = express.Router();
const pool = require('../database');

// Buscar todos os pagamentos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM payments');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pagamentos' });
  }
});

// Atualizar um pagamento pelo ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, method, amount } = req.body;

    await pool.query(
      'UPDATE payments SET status = $1, method = $2, amount = $3 WHERE id = $4',
      [status, method, amount, id]
    );

    res.json({ message: 'Pagamento atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar pagamento' });
  }
});

module.exports = router;
