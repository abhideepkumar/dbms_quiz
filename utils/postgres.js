import { Pool, Client } from 'pg';

const pool = new pool(
{
    host:process.env.POSTGRES_HOST || "localhost",
    port:process.env.POSTGRES_PORT || "5432",
    user:process.env.POSTGRES_USER || "postgres",
    password:process.env.POSTGRES_PASSWORD || "postgres",
    database:process.env.POSTGRES_DB || "dbms_quiz"
});

const client = new Client()
await client.connect()

export default pool;