import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen bg-gradient-radial overflow-hidden">
      {/* <Header /> */}

      <main className="container mx-auto px-6 py-8 h-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
