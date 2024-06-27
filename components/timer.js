'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { onQuizComplete } from '@/app/actions';
import { useParams } from 'next/navigation';


const Timer = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [progress, setProgress] = useState(100);

  const {quiz_id} = useParams();

  useEffect(() => {
    if (timeLeft <= 0) {
        console.log("Timer completed");
        onQuizComplete(quiz_id);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = prevTime - 1;
        setProgress((newTime / time) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-64 mx-auto">
      <CardContent className="pt-6">
        <div className="text-4xl font-bold text-center mb-4">
          {formatTime(timeLeft)}
        </div>
        <Progress value={progress} className="w-full" />
      </CardContent>
    </Card>
  );
};

export default Timer;