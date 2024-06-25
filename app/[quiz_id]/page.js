import Question from '@/components/question';
import React from 'react';

const Quiz = ({ params }) => {
    const checkParams = (params) => {
        //checking the params is valid or not
        console.log('params', params);
        //if not valid  then a 404 page will be shown
        //if valid then the quiz page will be shown
    };
    return (
        <div className='p-5'> 
            Quiz ID: {params.quiz_id}
            <div className='p-5'>
                <Question />
            </div>
        </div>
    );
};

export default Quiz;
