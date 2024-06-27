'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Timer from './timer';

const IdleTimerDialog = ({ onIdle }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds for example

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsDialogOpen(true);
      setTimeLeft(5/60); 
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleCancel = () => {
    setIsDialogOpen(false);
    setTimeLeft(5); // Reset timer when cancelled
  };

  const handleTimerComplete = () => {
    setIsDialogOpen(false);
    if (typeof onIdle === 'function') {
      onIdle();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you still there?</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Timer 
            time={timeLeft} 
            onComplete={handleTimerComplete} 
            isRunning={isDialogOpen}
          />
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={handleCancel}>Yes, Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IdleTimerDialog;