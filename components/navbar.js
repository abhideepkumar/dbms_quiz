import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-end bg-slate-100">
            <Button variant="secondary" className="hover:text-gray-400">
                <Link href="/"> Home </Link>
            </Button>
            <Button variant="secondary" className="hover:text-gray-400">
                <Link href="/quizzes"> Quizzes</Link>
            </Button>
            <Button variant="secondary" className="hover:text-gray-400">
                <Link href="/about"> About</Link>
            </Button>
        </nav>
    );
};

export default Navbar;
