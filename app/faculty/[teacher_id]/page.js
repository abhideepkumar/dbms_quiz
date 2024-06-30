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
                        user={{
                            name: 'ABHIDEEP KUMAR ISE22A',
                            email: 'nandinibm@nie.ac.in',
                            image: 'https://lh3.googleusercontent.com/a/ACg8ocIMmbcyIcuijK5KUwsh4tW0pWRC2aZCMZdEelTy2aKesji7qw=s96-c',
                        }}
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
