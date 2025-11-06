import SearchBar from '@/components/SearchBar';
import ViewToggle from '@/components/ViewToggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HeaderProps {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
}

export default function Header({ view, setView }: HeaderProps) {
  return (
    <header className="border-b border-border p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Cursor Servers
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your local and remote server instances.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <Select defaultValue="name">
              <SelectTrigger className="glass-card h-10 w-40 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Server Name</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="stars">Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ViewToggle view={view} onViewChange={setView} />
        </div>
      </div>
      <SearchBar />
    </header>
  );
}
