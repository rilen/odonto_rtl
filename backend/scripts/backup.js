// Salvar em: backend/scripts/backup.js
const { Pool } = require('pg');
const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = `backup-${timestamp}.sql`;
  const backupPath = `../data/${backupFile}`;

  exec(`pg_dump ${process.env.DATABASE_URL} > ${backupPath}`, (err) => {
    if (err) {
      console.error('Erro no backup:', err);
      return;
    }
    console.log(`Backup criado: ${backupPath}`);
  });
}

// Executa backup a cada 24 horas
setInterval(createBackup, 24 * 60 * 60 * 1000);

// Executa backup imediato ao iniciar
createBackup();
