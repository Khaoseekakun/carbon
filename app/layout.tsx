import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AuthProvider } from './auth-provider';
import SessionProvider from "@/components/providers/SessionProvider"; // adjust path as needed

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carbon Footprint Calculator',
  description: 'Calculate and understand your carbon footprint to make more sustainable choices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" >
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}