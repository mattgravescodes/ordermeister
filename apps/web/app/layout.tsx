// React
import { PropsWithChildren } from 'react';

// NextJS
import type { Metadata } from 'next';

// Fonts
import { Inter } from 'next/font/google';

// CSS
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OrderMeister',
  description: 'OrderMeister MesiterOrder - Orders abound!',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
