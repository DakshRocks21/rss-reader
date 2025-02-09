// Daksh wrote this

import './globals.css';
import AuthComp from '@/components/AuthComp';

export const viewport = {
  themeColor: "#904A49",
};

export const metadata = {
  title: "RSS Reader",
  description: "A personalized RSS Feed reader with category filtering and a beautiful UI.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      }
    ],
  },
};

// I use AuthComp to check if the user is authenticated or not
// This also RELOADS the token when the user's name changes, as well as the user when he/she signs out or signs in
export default function RootLayout({ children }) {
  return (
    <html>
       <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <AuthComp />
        {children}
      </body>
    </html>
  );
}
