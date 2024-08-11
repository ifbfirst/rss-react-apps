import type { Metadata } from 'next';
import './global.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Star Wars People Finder',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/b0c0f87c06.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
