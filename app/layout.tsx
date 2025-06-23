import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Artistly | Book Performers',
  description: 'A platform to book singers, dancers, DJs, and speakers for your event.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
