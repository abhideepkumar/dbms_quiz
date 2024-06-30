'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { LogIn, AlertCircle, MailPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { handleSignin } from '@/app/actions'; // Ensure this is the correct import

const Login = ({ target }) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary text-white p-6 text-center">
                    <LogIn className="w-12 h-12 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold">Login for {target}</h1>
                </div>
                <div className="p-6">
                    <p className="text-center text-gray-600 mb-6">
                        It seems like you {"haven't"} logged in yet. Please login to continue.
                    </p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full flex items-center justify-center" variant="outline">
                                <MailPlus className="w-5 h-5 mr-2" />
                                Login with Google
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
                                    Login with Google
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Please ensure {"you're"} logged into your Institute Gmail account on this device
                                    before proceeding.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>handleSignin("google",target)}>Continue to Login</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-center text-sm text-gray-600">
                    Need help? Contact support at no-help@from-us.com
                </div>
            </div>
        </div>
    );
};

export default Login;
