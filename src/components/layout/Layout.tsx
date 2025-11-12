import { ReactNode } from 'react';
import SideNavigation from './SideNavigation';
import TitleBar from '@/components/TitleBar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen min-h-screen w-full flex-col overflow-hidden">
      <TitleBar />
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute bottom-0 left-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--primary))_0%,transparent_100%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--gradient-secondary))_0%,transparent_100%)] blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full min-h-0 w-full p-0">
        <div className="glass-card flex h-full w-full overflow-hidden rounded-b-2xl rounded-t-none shadow-2xl">
          <div className="flex h-full w-full">
            <SideNavigation />

            {/* Main Content Area */}
            <main className="flex flex-1 flex-col overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
