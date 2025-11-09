import { Grid3x3 } from 'lucide-react';

interface Menu {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

export const menus: Menu[] = [
  { id: 'home', name: 'Home', icon: Grid3x3, isActive: true },
];
