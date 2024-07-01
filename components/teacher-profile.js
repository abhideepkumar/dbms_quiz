'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, GraduationCap, Users } from 'lucide-react';
import { handleSignOut } from '@/app/actions';
import QuizUpload from './addQuizBox';

const extractTeacherInfo = (email) => {
    const match = email.match(/^([a-z]+)@nie\.ac\.in$/i);
    if (!match) {
        console.log("Invalid email format of teacher");
    }

    const [, name] = match;
    return {
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    };
};

const TeacherProfile = ({ user }) => {
    const { name } = extractTeacherInfo(user.email);

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl mx-auto shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-stretch">
                    <CardHeader className="sm:w-1/3 p-4 flex flex-col items-center justify-center space-y-2">
                        <Avatar className="w-20 h-20 border-2">
                            <AvatarImage src={user.image} alt={name} />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold text-center">{name}</h2>
                        <p className="text-sm text-center">Faculty Member</p>
                        <Badge variant="secondary" className="text-primary">
                            Teacher
                        </Badge>
                    </CardHeader>
                    <Separator className="sm:hidden my-2" />
                    <div className="hidden sm:block w-px bg-gray-200 mx-2" />
                    <CardContent className="sm:w-2/3 p-4 space-y-4 flex flex-col justify-center">
                        <InfoItem icon={<Mail className="w-4 h-4" />} text={user.email} />
                        <InfoItem icon={<GraduationCap className="w-4 h-4" />} text="NIE Faculty" />
                        <InfoItem icon={<Users className="w-4 h-4" />} text="Department" />
                        <div className="flex justify-end mt-4 space-x-2">
                            <QuizUpload />
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

export default TeacherProfile;