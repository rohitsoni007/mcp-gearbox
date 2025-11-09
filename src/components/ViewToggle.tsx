import { Grid3x3, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="glass-card flex items-center gap-1 rounded-xl p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
          view === 'grid'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <Grid3x3 className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
          view === 'list'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}
