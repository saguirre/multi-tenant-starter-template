import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { stackServerApp } from "../stack";
import "./globals.css";
import { Provider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reveal",
  description: "Build your dream Gender Reveal.",
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
          <StackProvider app={stackServerApp}>
            <StackTheme theme={{
              light: {
                primary: 'hsl(320, 100%, 70%)',
                secondary: 'hsl(200, 100%, 50%)',
                background: 'hsl(210, 40%, 98%)',
                foreground: 'hsl(222.2, 47.4%, 11.2%)',
                muted: 'hsl(210, 40%, 96.1%)',
                accent: 'hsl(340, 82%, 96%)',
                destructive: 'hsl(0, 84.2%, 60.2%)',
              },
              dark: {
                primary: 'hsl(340, 82%, 52%)',
                secondary: 'hsl(203, 100%, 44%)',
                background: 'hsl(222.2, 84%, 4.9%)',
                foreground: 'hsl(210, 40%, 98%)',
                muted: 'hsl(217.2, 32.6%, 17.5%)',
                accent: 'hsl(340, 82%, 30%)',
                destructive: 'hsl(0, 62.8%, 30.6%)',
              },
              radius: '0.5rem'
            }}>
              {children}
            </StackTheme>
          </StackProvider>
        </Provider>
      </body>
    </html>
  );
}
