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
import { Chrome } from 'lucide-react';

const Login = () => {
    return (
        <div className="flex p-5 flex-col bg-slate-300 m-10 rounded-md items-center">
            <h1 className="text-center p-5 ">It seems like, you have not logged in yet, please login to continue.</h1>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>
                        <Chrome className="mr-2 h-4 w-4" /> Login using email
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login with Google</AlertDialogTitle>
                        <AlertDialogDescription>
                            You need to add your Institute Gmail logged in to your device before continuing this
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue to login</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Login;
