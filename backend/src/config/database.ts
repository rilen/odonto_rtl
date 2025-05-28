import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
    host: process.env.SUPABASE_DB_HOST,
    port: Number(process.env.SUPABASE_DB_PORT),
                      user: process.env.SUPABASE_DB_USER,
                      password: process.env.SUPABASE_DB_PASSWORD,
                      database: process.env.SUPABASE_DB_NAME,
                      ssl: false // Desative SSL para conexão local
});

export default pool;
