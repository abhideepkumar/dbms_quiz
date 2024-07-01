import Login from '@/components/login';
import React from 'react';
import { auth } from '@/auth';
import TeacherProfile from '@/components/teacher-profile';
import Link from 'next/link';

const TeacherPage = async ({ params }) => {
    const session = await auth();
    console.log('Console from homepage: ', session?.user);
    return (
        <main>
            {!session && <Login target={'Teacher'} />}
            {session && (
                <div>
                    <TeacherProfile
                        user={session?.user}
                    />
                </div>
            )}
            <Link href="/template.csv" download className="text-blue-600 underline flex justify-center">
                Download CSV Template of Quiz
            </Link>
        </main>
    );
};

export default TeacherPage;
