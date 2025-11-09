import SearchBar from '@/components/SearchBar';
import ViewToggle from '@/components/ViewToggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useActiveAgent } from '@/hooks/useActiveAgent';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSortBy } from '@/store/slices/serverSlice';
import { selectSortBy } from '@/store/selectors/serverSelectors';
import { useMcpService } from '@/hooks/useMcpService';
import { useEffect, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface HeaderProps {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
}

export default function Header({ view, setView }: HeaderProps) {
  const dispatch = useAppDispatch();
  const activeAgent = useActiveAgent();
  const reduxSortBy = useAppSelector(selectSortBy);
  const [localSortBy, setLocalSortBy] = useState(reduxSortBy);
  const { isInstalled, isInstalling, installCli } = useMcpService();

  // Sync local state with Redux state
  useEffect(() => {
    setLocalSortBy(reduxSortBy);
  }, [reduxSortBy]);

  // Update Redux state when local state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSortBy(localSortBy));
    }, 300);

    return () => clearTimeout(timer);
  }, [localSortBy, dispatch]);

  const handleSortChange = (value: string) => {
    setLocalSortBy(value);
  };

  return (
    <header className="border-b border-border p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            {activeAgent?.name || 'MCP'}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your local MCP server configuration
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!isInstalled && !activeAgent && (
            <Button
              onClick={installCli}
              disabled={isInstalling}
              variant="default"
              size="sm"
            >
              {isInstalling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Installing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Install MCP CLI
                </>
              )}
            </Button>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <Select value={localSortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="glass-card h-10 w-40 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Stars</SelectItem>
                <SelectItem value="name">Name</SelectItem>
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
