import { Pool, Client } from 'pg';

const pool = new pool(
{
    host:"localhost",
    port:"5432",
    user: "Areil",
    password: "India@123",
    database: "dbms_quiz"
});

const client = new Client()
await client.connect()

async function addStudent(usn, email) {
    const text = 'INSERT INTO students(usn, email) VALUES($1, $2)';
    const values = [usn, email];
    
    try {
        const res = await client.query(text, values);
        console.log(res.rows[0]);
    } catch (err) {
        console.error('Error inserting student:', err);
    }
}


export default pool;