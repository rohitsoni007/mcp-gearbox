interface MenuItem {
  id: string;
  isActive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  menus: MenuItem[];
  onToggleAgentPanel: () => void;
  isAgentPanelOpen: boolean;
}