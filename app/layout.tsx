import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

const SITE_URL = 'https://paramjoshi0702-jpg.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Param Joshi — AI Enthusiast & Software Developer',
    template: '%s — Param Joshi',
  },
  description:
    'Portfolio of Param Joshi, Computer Science Engineering student specializing in Artificial Intelligence. AI enthusiast, software developer, and future AI engineer.',
  keywords: ['Param Joshi', 'AI Engineer', 'Software Developer', 'Portfolio', 'Artificial Intelligence', 'CSE', 'ITM SLS'],
  authors: [{ name: 'Param Joshi' }],
  creator: 'Param Joshi',
  themeColor: '#05030f',
  openGraph: {
    title: 'Param Joshi — AI Enthusiast & Software Developer',
    description: 'Computer Science Engineering student specializing in Artificial Intelligence.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Param Joshi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Param Joshi — AI Enthusiast & Software Developer',
    description: 'Computer Science Engineering student specializing in Artificial Intelligence.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#05030f',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Param Joshi',
  url: SITE_URL,
  jobTitle: 'AI Enthusiast & Software Developer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'ITM SLS Baroda University',
  },
  knowsAbout: ['Artificial Intelligence', 'Python', 'Java', 'Web Development', 'C Programming'],
  email: 'paramjoshi0702@gmail.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
