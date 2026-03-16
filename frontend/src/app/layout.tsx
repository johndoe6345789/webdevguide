import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'React Web Dev Guide - Learn to Build Websites from Scratch',
  description:
    'A comprehensive, beginner-friendly guide to building React websites. Covers setup, fundamentals, AI-assisted development, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
