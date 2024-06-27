'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


const Timer = ({ time, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(time*60);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
        console.log("Timer completed");
        onComplete();
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
  }, [timeLeft, time, onComplete]);

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