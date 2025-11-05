import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <div className="min-h-screen bg-gradient-radial">
      {/* <Header /> */}

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
