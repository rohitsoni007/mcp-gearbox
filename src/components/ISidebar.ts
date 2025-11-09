type MenuItem = {
  id: string;
  isActive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

type SidebarProps = {
  menus: MenuItem[];
  onToggleAgentPanel: () => void;
  isAgentPanelOpen: boolean;
}
