import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'DBMS QUIZ APP',
    description: 'quiz app',
};

export default function RootLayout({ session,children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <SessionProvider session={session}>
                <Navbar />
                {children}
            </SessionProvider>
            </body>
        </html>
    );
}
