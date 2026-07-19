import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Param Joshi — AI Enthusiast & Software Developer',
  description:
    'Portfolio of Param Joshi, Computer Science Engineering student specializing in Artificial Intelligence. AI enthusiast, software developer, and future AI engineer.',
  keywords: ['Param Joshi', 'AI Engineer', 'Software Developer', 'Portfolio', 'Artificial Intelligence'],
  authors: [{ name: 'Param Joshi' }],
  openGraph: {
    title: 'Param Joshi — AI Enthusiast & Software Developer',
    description: 'Computer Science Engineering student specializing in Artificial Intelligence.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
