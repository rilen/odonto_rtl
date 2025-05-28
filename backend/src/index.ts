import * as dotenv from "dotenv";
dotenv.config();

console.log("Banco:", process.env.SUPABASE_DB_HOST);


import * as express from "express";
import pool from "./config/database";

const app = express();

app.get("/test-db", async (_req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({ message: "Banco conectado!", timestamp: result.rows[0].now });
    } catch (error) {
        res.status(500).json({ error: "Erro ao conectar ao banco", details: error });
    }
});

app.listen(5000, () => console.log("🔥 Servidor rodando na porta 5000"));
