"use client"

import './globals.css';
import AuthComp from '@/components/AuthComp';
import { logoutSession } from '@/lib/session';

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
