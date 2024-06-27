'use client';
import React, { useState, useEffect } from 'react';
import sampleQuestions from '@/app/data/question_set';
import { Button } from './ui/button';
import SkeletonPlate from './skeleton';
import { handleOptionSelect } from '@/app/actions';
import {onQuizComplete} from '@/app/actions';
import { useRouter,useParams} from 'next/navigation';

const Question = () => {
    const {quiz_id} = useParams();
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionID, setSelectedOptionID] = useState(null);

    const currentQuestion = sampleQuestions[currentQuestionIndex];

    useEffect(() => {
        // Reset the selected option when the question changes
        setSelectedOptionID(null);
        if (typeof window !== 'undefined' && window.localStorage) {
            const savedOptionID = localStorage.getItem(currentQuestion.questionID);
            if (savedOptionID) {
                setSelectedOptionID(savedOptionID);
            }
        }
    }, [currentQuestionIndex]);

    const handleChoose = (optionID, correct, questionID) => {
        handleOptionSelect(optionID, correct, questionID)
            .then(() => {
                setSelectedOptionID(optionID);
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.setItem(questionID, optionID);
                }
            })
            .catch((err) => {
                console.error('Failed to update option:', err);
                // Handle failure of updating option in the backend
            });
    };

    const handleNext = () => {
        if (currentQuestionIndex < sampleQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        localStorage.clear();
        setCurrentQuestionIndex(0);
        setSelectedOptionID(null);
        router.push(`/${quiz_id}/result`);
        // Handle form submission
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-screen-lg">
                {/* Question */}
                <div className="w-2/3 mx-auto">
                    <div className="w-full py-5 rounded-full flex justify-center items-center bg-slate-100">
                        <p className="text-2xl">{currentQuestion.question}</p>
                    </div>
                </div>
                {/* Options */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={option.optionID}
                            onClick={() => handleChoose(option.optionID, option.correct, currentQuestion.questionID)}
                            className={`w-full py-3 rounded-full hover:bg-yellow-200 flex justify-center items-center bg-white border border-gray-300 focus:outline-none ${
                                option.optionID === selectedOptionID ? 'bg-yellow-200 border-yellow-500' : ''
                            }`}
                        >
                            <p className="text-lg">
                                {String.fromCharCode(65 + index)}. {option.optionText}
                            </p>
                        </button>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <Button variant="ghost" className="p-5 flex items-center" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                        <p>Previous</p>
                    </Button>
                   {!(currentQuestionIndex === sampleQuestions.length - 1)&&( <Button variant="ghost" className="p-5 flex items-center" onClick={handleNext} >
                        <p>Next</p>
                    </Button>)}
                    {(currentQuestionIndex === sampleQuestions.length - 1)&&( <Button variant="outline" className="p-5 flex items-center" onClick={onQuizComplete(quiz_id)} >
                        <p>Submit</p>
                    </Button>)}
                </div>
            </div>
        </div>
    );
};

export default Question;
