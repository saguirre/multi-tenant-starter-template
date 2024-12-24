import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Provider } from './provider';
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Reveal',
  description: 'Build your dream Gender Reveal.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <ClerkProvider>{children}</ClerkProvider>
        </Provider>
      </body>
    </html>
  );
}
