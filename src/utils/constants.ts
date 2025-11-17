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

export const CLI_VERSION = '0.0.14';

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const ONE_HOUR_MS = 2 * 60 * 1000; // update to 2 min for fast update
