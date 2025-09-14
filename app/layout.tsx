import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  title: 'DressMyGravel - Weather-Based Gravel Cycling Gear Recommendations',
  description:
    'Get personalized gravel cycling clothing recommendations based on current weather conditions. Perfect gear for every ride.',
  keywords:
    'gravel cycling, cycling gear, weather clothing, cycling apparel, bike clothing',
  authors: [{ name: 'DressMyGravel' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DressMyGravel',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'DressMyGravel',
    title: 'DressMyGravel - Weather-Based Gravel Cycling Gear',
    description:
      'Get personalized gravel cycling clothing recommendations based on current weather conditions.',
  },
  twitter: {
    card: 'summary',
    title: 'DressMyGravel - Weather-Based Gravel Cycling Gear',
    description:
      'Get personalized gravel cycling clothing recommendations based on current weather conditions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
