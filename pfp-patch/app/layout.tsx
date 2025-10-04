import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pumpkin Patch',
  description: 'Motivic PFP transformations for Cryptober'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
