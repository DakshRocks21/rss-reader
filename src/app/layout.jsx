// Daksh wrote this
"use client"

import './globals.css';
import AuthComp from '@/components/AuthComp';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthComp />
        {children}
      </body>
    </html>
  );
}
