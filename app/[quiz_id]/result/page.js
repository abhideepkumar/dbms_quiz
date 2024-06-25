import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ResultTab = ({ params }) => {
    const quizData = {
        quizID: 'Q123456789012345',
        teacherID: 'T123456789012345',
        title: 'Quiz 1',
        description: 'Quiz 1 description',
        date_created: '2022-01-01',
    };

    return (
        <Card className="w-full max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Quiz Result: {quizData.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Quiz url</TableCell>
                            <TableCell>domain.com/{params.quiz_id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Quiz ID</TableCell>
                            <TableCell>{quizData.quizID}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Teacher ID</TableCell>
                            <TableCell>{quizData.teacherID}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Description</TableCell>
                            <TableCell>{quizData.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Date Created</TableCell>
                            <TableCell>{quizData.date_created}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ResultTab;
