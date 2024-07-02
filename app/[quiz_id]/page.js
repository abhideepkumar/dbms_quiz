import React from 'react';
import Question from '@/components/question';
import Timer from '@/components/timer';
import IdleTimerDialog from '@/components/idle_detector';
import { isValidQuizId, getQuizQuestions } from '../actions';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Quiz = async ({ params }) => {
    const session = await auth();
    if (!session) {
        redirect('/');
    }

    if (!params.quiz_id) {
        console.error('No quiz ID provided');
        redirect('/');
    }

    const isValid = await isValidQuizId(params.quiz_id);
    if (!isValid) {
        console.error('Invalid quiz ID');
        redirect('/');
    }

    const questions = await getQuizQuestions(params.quiz_id);
    console.log(questions);

    return (
        <div className="p-5">
            <IdleTimerDialog />
            <div className="p-5">
                Quiz ID: {params.quiz_id}
                {console.log(questions)}
                <Question questions={questions} />
                <Timer time={5 * 60} />
            </div>
        </div>
    );
};

export default Quiz;