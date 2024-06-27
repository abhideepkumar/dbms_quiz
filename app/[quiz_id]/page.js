import Question from '@/components/question';
import Timer from '@/components/timer';
import { onQuizComplete } from '../actions';
import React from 'react';
import IdleTimerDialog from '@/components/idle_detector';

const Quiz = ({ params }) => {
    const checkParams = (params) => {
        //checking the params is valid or not
        console.log('params', params);
        //if not valid  then a 404 page will be shown
        //if valid then the quiz page will be shown
    };

    const showQuizResult = () => {
        onQuizComplete(params.quiz_id);
    }
    return (
        <div className='p-5'> 
        <IdleTimerDialog/>
            Quiz ID: {params.quiz_id}
            <div className='p-5'>
                <Question />
                <Timer time={5} onComplete={() => onQuizComplete(params.quiz_id)}/>
            </div>
        </div>
    );
};

export default Quiz;
