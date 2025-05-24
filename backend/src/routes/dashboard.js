// Salvar em: backend/src/routes/dashboard.js
const express = require('express');
const router = express.Router();
const pool = require('../database'); // Supondo que você use o pool de conexão do seu projeto

// Exemplo de rota protegida para dashboard
router.get('/', async (req, res) => {
  try {
    // Exemplo: Contar usuários cadastrados
    const { rows: usersCount } = await pool.query('SELECT COUNT(*) FROM users');
    // Exemplo: Contar consultas agendadas (se existir tabela appointments)
    // const { rows: appointmentsCount } = await pool.query('SELECT COUNT(*) FROM appointments');

    res.json({
      usersCount: parseInt(usersCount[0].count, 10),
      // appointmentsCount: parseInt(appointmentsCount[0].count, 10),
      message: 'Dados do dashboard obtidos com sucesso'
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar dados do dashboard' });
  }
});

module.exports = router;
