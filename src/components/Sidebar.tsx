import { cn } from '@/lib/utils';
import { PanelLeft } from 'lucide-react';

interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

interface SidebarProps {
  menus: MenuItem[];
  onToggleAgentPanel: () => void;
  isAgentPanelOpen: boolean;
}

export default function Sidebar({
  menus,
  onToggleAgentPanel,
  isAgentPanelOpen,
}: SidebarProps) {
  return (
    <nav className="glass-sidebar flex h-full flex-col justify-between p-2.5 w-20">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onToggleAgentPanel}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90"
        >
          <PanelLeft
            className={cn(
              'h-5 w-5 transition-transform',
              !isAgentPanelOpen && 'rotate-180'
            )}
          />
        </button>
        <div className="h-px w-8 bg-border" />
        {menus.map((menu: MenuItem) => (
          <button
            key={menu.id}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-all',
              menu.isActive
                ? 'bg-sidebar-accent text-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
            )}
          >
            <menu.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
      {/* <div className="flex flex-col items-center gap-4">
        <button className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-foreground">
          <Settings className="h-5 w-5" />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-foreground">
          <FileText className="h-5 w-5" />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-sidebar-accent hover:text-foreground">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-foreground transition-all hover:bg-muted/80">
          <User className="h-5 w-5" />
        </button>
      </div> */}
    </nav>
  );
}
