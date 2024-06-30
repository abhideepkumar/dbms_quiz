'use server';
import { redirect} from 'next/navigation';
import  pool  from '@/lib/db';



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
//scraping data from email
function extractInfo(email) {
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

    return {
        name: name,
        branch: branch,
        batchYear: `${year}-${parseInt(year) + 4}`,
        section: section.toUpperCase(),
    };
}

export async function checkStudent(email)
{
    try {
        // Construct the SQL query
        const query = `
            SELECT COUNT(*) AS count
            FROM public.students
            WHERE email = $1
        `;

        // Prepare the values
        const values = [email];

        // Execute the query
        const result = await handleQuery(query, values);

        // Check if the student exists
        const count = parseInt(result.rows[0].count, 10);
        if (count > 0) {
            return { exists: true, message: 'Student already exists' };
        } else {
            return { exists: false, message: 'Student does not exist' };
        }
    } catch (error) {
        console.error('Error checking student:', error);
        return { exists: false, message: error.message };
    }
}

export async function createStudents(USN,email)
{
    try {
        // Check if the student already exists
        const checkResult = await checkStudent(email);
        if (checkResult.exists) {
            return { success: false, message: 'Student already exists' };
        }

        const studentInfo = extractInfo(email);

        // Construct the SQL query
        const query = `
            INSERT INTO public.students (usn, name, email, admissionyear, branch, section)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        // Prepare the values
        const values = [
            USN,
            studentInfo.name,
            email,
            `${studentInfo.batchYear.split('-')[0]}-01-01`, // Assuming admissionyear starts from the batch year
            studentInfo.branch,
            studentInfo.section
        ];

        // Execute the query
        await handleQuery(query, values);

        return { success: true, message: 'Student created successfully' };
    } catch (error) {
        console.error('Error creating student:', error);
        return { success: false, message: error.message };
    }
}


export async function checkTeacher(temail) {
    try {
        // Construct the SQL query
        const query = `
            SELECT COUNT(*) AS count
            FROM public.teachers
            WHERE temail = $1
        `;

        // Prepare the values
        const values = [temail];

        // Execute the query
        const result = await handleQuery(query, values);

        // Check if the teacher exists
        const count = parseInt(result.rows[0].count, 10);
        if (count > 0) {
            return { exists: true, message: 'Teacher already exists' };
        } else {
            return { exists: false, message: 'Teacher does not exist' };
        }
    } catch (error) {
        console.error('Error checking teacher:', error);
        return { exists: false, message: error.message };
    }
}


export async function createTeacher(tname, temail) {
    try {
        // Check if the teacher already exists
        const checkResult = await checkTeacher(temail);
        if (checkResult.exists) {
            return { success: false, message: 'Teacher already exists' };
        }

        // Construct the SQL query
        const query = `
            INSERT INTO public.teachers (tname, temail)
            VALUES ($1, $2)
            RETURNING teacherid
        `;

        // Prepare the values
        const values = [tname, temail];

        // Execute the query
        const result = await handleQuery(query, values);
        
        const teacherId = result.rows[0].teacherid;

        return { success: true, message: 'Teacher created successfully', teacherId: teacherId };
    } catch (error) {
        console.error('Error creating teacher:', error);
        return { success: false, message: error.message };
    }
}





export async function handleOptionSelect(optionID, correct, questionID) {
    console.log(`Selected option ID: ${optionID}`);
    console.log(`Correct option ID: ${correct}`);
    console.log(`Question ID: ${questionID}`);
}

export async function onQuizComplete(params_uri) {
    console.log('Quiz completed of', params_uri);
    redirect(`/${params_uri}/result`);
}

export async function test(code) {
    console.log('tesst', code);
}

// Student actions
export const fetchAllStudents = async () => {
    return handleQuery('SELECT * FROM students');
};

export const insertStudent = async (email) => {
    const { name, batchYear, branch, section } = extractInfo(email);
    console.log('Adding a new user: ', email, name, batchYear, branch, section);
    const query = `
        INSERT INTO students (usn, name, email, admissionyear, branch, section)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [email, name, email, batchYear, branch, section];
    const result = await handleQuery(query, values);
    return result[0];
};

// export const updateStudent = async (usn, name, email, admissionyear, branch, section) => {
//     const query = `
//         UPDATE students
//         SET name = $1, email = $2, admissionyear = $3, branch = $4, section = $5
//         WHERE usn = $6
//         RETURNING *;
//     `;
//     const values = [name, email, admissionyear, branch, section, usn];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// Teacher actions
// export const fetchAllTeachers = async () => {
//     return handleQuery('SELECT * FROM teachers');
// };

// export const insertTeacher = async (teacherid, tname, temail) => {
//     const query = `
//         INSERT INTO teachers (teacherid, tname, temail)
//         VALUES ($1, $2, $3)
//         RETURNING *;
//     `;
//     const values = [teacherid, tname, temail];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// export const updateTeacher = async (teacherid, tname, temail) => {
//     const query = `
//         UPDATE teachers
//         SET tname = $1, temail = $2
//         WHERE teacherid = $3
//         RETURNING *;
//     `;
//     const values = [tname, temail, teacherid];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// Quiz actions
// export const fetchAllQuizzes = async () => {
//     return handleQuery('SELECT * FROM quiz');
// };

export const fetchQuizById = async (quizid) => {
    const query = 'SELECT * FROM quiz WHERE quizid = $1';
    const result = await handleQuery(query, [quizid]);
    return result[0];
};

// export const insertQuiz = async (quizid, title, teacherid, createdat, quiz_duration) => {
//     const query = `
//         INSERT INTO quiz (quizid, title, teacherid, createdat, quiz_duration)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING *;
//     `;
//     const values = [quizid, title, teacherid, createdat, quiz_duration];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// export const updateQuiz = async (quizid, title, teacherid, createdat, quiz_duration) => {
//     const query = `
//         UPDATE quiz
//         SET title = $1, teacherid = $2, createdat = $3, quiz_duration = $4
//         WHERE quizid = $5
//         RETURNING *;
//     `;
//     const values = [title, teacherid, createdat, quiz_duration, quizid];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// Question actions
// export const fetchAllQuestions = async () => {
//     return handleQuery('SELECT * FROM question');
// };

export const fetchQuestionsByQuizId = async (quizid) => {
    const query = 'SELECT * FROM question WHERE quizid = $1';
    return handleQuery(query, [quizid]);
};

// export const insertQuestion = async (questionid, quizid, questiontext, correctanswerid) => {
//     const query = `
//         INSERT INTO question (questionid, quizid, questiontext, correctanswerid)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;
//     `;
//     const values = [questionid, quizid, questiontext, correctanswerid];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// export const updateQuestion = async (questionid, quizid, questiontext, correctanswerid) => {
//     const query = `
//         UPDATE question
//         SET quizid = $1, questiontext = $2, correctanswerid = $3
//         WHERE questionid = $4
//         RETURNING *;
//     `;
//     const values = [quizid, questiontext, correctanswerid, questionid];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// Option actions
// export const fetchAllOptions = async () => {
//     return handleQuery('SELECT * FROM option');
// };

export const fetchOptionsByQuestionId = async (questionid) => {
    const query = 'SELECT * FROM option WHERE questionid = $1';
    return handleQuery(query, [questionid]);
};

// export const insertOption = async (optionid, questionid, optiontext, points) => {
//     const query = `
//         INSERT INTO option (optionid, questionid, optiontext, points)
//         VALUES ($1, $2, $3, $4)
//         RETURNING *;
//     `;
//     const values = [optionid, questionid, optiontext, points];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// export const updateOption = async (optionid, questionid, optiontext, points) => {
//     const query = `
//         UPDATE option
//         SET questionid = $1, optiontext = $2, points = $3
//         WHERE optionid = $4
//         RETURNING *;
//     `;
//     const values = [questionid, optiontext, points, optionid];
//     const result = await handleQuery(query, values);
//     return result[0];
// };

// Result actions
// export const fetchAllResults = async () => {
//     return handleQuery('SELECT * FROM result');
// };

export const fetchResultsByStudentId = async (studentid) => {
    const query = 'SELECT * FROM result WHERE studentid = $1';
    return handleQuery(query, [studentid]);
};

// function below to upsert
export const upsertResult = async (resultid, quizid, studentid, questionid, selectedanswerid, attempted) => {
    // Query to check if an entry exists with the same questionID and studentID
    const checkQuery = `
        SELECT resultid FROM result
        WHERE questionid = $1 AND studentid = $2;
    `;
    const checkValues = [questionid, studentid];
    const checkResult = await handleQuery(checkQuery, checkValues);

    let query, values;

    if (checkResult.length > 0) {
        // If an entry exists, update it
        query = `
            UPDATE result
            SET quizid = $1, studentid = $2, questionid = $3, selectedanswerid = $4, attempted = $5
            WHERE resultid = $6
            RETURNING *;
        `;
        values = [quizid, studentid, questionid, selectedanswerid, attempted, checkResult[0].resultid];
    } else {
        // If no entry exists, insert a new one
        query = `
            INSERT INTO result (resultid, quizid, studentid, questionid, selectedanswerid, attempted)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        values = [resultid, quizid, studentid, questionid, selectedanswerid, attempted];
    }

    const result = await handleQuery(query, values);
    return result[0];
};
