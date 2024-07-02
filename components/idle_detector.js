'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Timer from './timer';

const IdleTimerDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);

    const handleVisibilityChange = () => {
        if (document.hidden) {
            setIsDialogOpen(true);
            setTimeLeft(500);
        }
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleCancel = () => {
        setTimeLeft(5);
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you still there?</DialogTitle>
                </DialogHeader>
                <div className="py-4">{isDialogOpen && <Timer time={timeLeft} />}</div>
                <DialogFooter>
                    <Button variant="destructive" onClick={handleCancel}>
                        Yes, Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default IdleTimerDialog;
