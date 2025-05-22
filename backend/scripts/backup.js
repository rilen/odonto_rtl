// Salvar em: backend/scripts/backup.js
const { Pool } = require('pg');
const fs = require('fs');
const { exec } = require('child_process');
const AWS = require('aws-sdk');
const zlib = require('zlib');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = `backup-${timestamp}.sql`;
  const backupPath = `../data/${backupFile}`;
  const compressedFile = `${backupFile}.gz`;

  exec(`pg_dump ${process.env.DATABASE_URL} > ${backupPath}`, async (err) => {
    if (err) {
      console.error('Erro no backup:', err);
      return;
    }
    console.log(`Backup criado: ${backupPath}`);

    // Comprimir o arquivo
    const fileContent = fs.createReadStream(backupPath);
    const compressed = fileContent.pipe(zlib.createGzip());
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: compressedFile,
      Body: compressed
    };

    await s3.upload(params).promise();
    console.log(`Backup enviado para S3: ${compressedFile}`);

    // Remover arquivo local
    fs.unlinkSync(backupPath);
  });
}

// Executa backup a cada 24 horas
setInterval(createBackup, 24 * 60 * 60 * 1000);

// Executa backup imediato ao iniciar
createBackup();
