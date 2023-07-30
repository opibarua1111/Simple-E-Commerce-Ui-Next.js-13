'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';
import Provider from './context/AuthContext';
import ToasterContext from './context/TosterContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <ToasterContext />
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
