'use server';

import { redirect } from 'next/navigation';
import pool from '@/lib/db';
import { signIn, signOut } from '@/auth';

const handleQuery = async (query, values = []) => {
    const client = await pool.connect();
    try {
        const result = await client.query(query, values);
        return result.rows;
    } catch (err) {
        console.error(err);
        throw new Error('Database query failed');
    } finally {
        client.release();
    }
};

export async function handleSignin() {
    console.log('Signin initiated');
    await signIn('google', { redirectTo: '/' });
}

export async function handleSignOut() {
    console.log('Signout initiated');
    await signOut();
    redirect('/');
}

export async function addNewStudent(email) {
    console.log('Adding new student:', email);

    // Extract student information from email
    const emailRegex = /^(?<year>\d{4})(?<branchCode>[a-z]{2})_(?<name>[^_]+)_(?<section>[a-z])@/i;
    const branchMap = {
        is: 'ISE',
        cs: 'CSE',
        ci: 'AI/ML',
    };

    const match = email.match(emailRegex);
    if (!match) {
        throw new Error('Invalid email format');
    }

    const { year, branchCode, name, section } = match.groups;
    const branch = branchMap[branchCode];
    const batchYear = `${year}-${parseInt(year) + 4}`;

    // Add student to database
    const query = `
        INSERT INTO students (usn, name, email, admissionyear, branch, section)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [null, name, email, `${year}-01-01`, branch, section.toUpperCase()];

    console.log("Before adding new student", values);
    await handleQuery(query, values);
    console.log("After adding new student", values);
}

export async function handleOptionSelect(optionID, correct, questionID) {
    console.log(`Selected option ID: ${optionID}`);
    console.log(`Correct option ID: ${correct}`);
    console.log(`Question ID: ${questionID}`);
    // handle options
}

export async function onQuizComplete(params_uri) {
    console.log('Quiz completed of', params_uri);
    redirect(`/${params_uri}/result`);
}

export async function checkNewStudent(email) {
    console.log('Checking if new student:', email);
    const query = `
        SELECT email FROM students WHERE email = $1
    `;
    const values = [email];

    const result = await handleQuery(query, values);
    console.log("After checking new student", result);
    return result.length > 0;
}
