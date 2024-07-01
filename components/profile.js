'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, GraduationCap, Users, Calendar } from 'lucide-react';
import { handleSignOut, checkNewStudent, addNewStudent } from '@/app/actions';
import { redirect } from 'next/navigation';

const extractInfo = (email) => {
    const match = email.match(/^(\d{4})([a-z]{2})_[^_]+_([a-z])@/i);
    if (!match) {
        console.log('Invalid email format');
        redirect(`/faculty/${email}`);
    }

    const [, year, branchCode, section] = match;
    const branchMap = { is: 'ISE', cs: 'CSE', ci: 'AI/ML' };

    return {
        branch: branchMap[branchCode] || 'Unknown',
        batchYear: `${year}-${parseInt(year) + 4}`,
        section: section.toUpperCase(),
    };
};

const UserProfile = ({ user }) => {
    const { branch, batchYear, section } = extractInfo(user.email);

    useEffect(() => {
        const checkAndAddStudent = async () => {
            if (!user || !user.email) {
                throw new Error('User sign-in failed or email not available');
            }

            const email = user.email;

            try {
                const isNewStudent = await checkNewStudent(email);
                console.log("isNewStudent", isNewStudent);
                if (!isNewStudent) {
                    await addNewStudent(email);
                }
            } catch (error) {
                console.error('Error checking or adding new student:', error);
            }
        };

        checkAndAddStudent();
    }, [user]);

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl mx-auto shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-stretch">
                    <CardHeader className="sm:w-1/3 p-4 flex flex-col items-center justify-center space-y-2">
                        <Avatar className="w-20 h-20 border-2">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold text-center">{user.name}</h2>
                        <p className="text-sm text-center">{branch} Student</p>
                        <Badge variant="secondary" className="text-primary">
                            {batchYear} Batch
                        </Badge>
                    </CardHeader>
                    <Separator className="sm:hidden my-2" />
                    <div className="hidden sm:block w-px bg-gray-200 mx-2" />
                    <CardContent className="sm:w-2/3 p-4 space-y-4 flex flex-col justify-center">
                        <InfoItem icon={<Mail className="w-4 h-4" />} text={user.email} />
                        <InfoItem icon={<GraduationCap className="w-4 h-4" />} text={branch} />
                        <InfoItem icon={<Users className="w-4 h-4" />} text={`Section ${section}`} />
                        <InfoItem icon={<Calendar className="w-4 h-4" />} text={`${batchYear} Batch`} />
                        <div className="flex justify-end mt-4">
                            <Button variant="destructive" onClick={() => handleSignOut()}>
                                Sign Out
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

const InfoItem = ({ icon, text }) => (
    <div className="flex items-center space-x-2">
        <div className="text-primary">{icon}</div>
        <span className="text-sm">{text}</span>
    </div>
);

export default UserProfile;
