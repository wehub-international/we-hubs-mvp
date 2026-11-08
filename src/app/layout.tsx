import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'WE HUBS Demo',
  description: 'Demo dashboard for multi-company education and travel operations.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
