'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, GraduationCap, Users, Calendar } from 'lucide-react';

const extractInfo = (email) => {
    const match = email.match(/^(\d{4})([a-z]{2})_[^_]+_([a-z])@/i);
    if (!match) throw new Error('Invalid email format');

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

    return (
        <Card className="w-full max-w-md mx-auto mt-5">
            <CardHeader className="flex flex-col items-center space-y-4 pb-6">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{branch} Student</p>
                </div>
                <Badge variant="secondary">{batchYear} Batch</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator />
                <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span>{branch}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>Section {section}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{batchYear} Batch</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserProfile;
