import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold">MCP Manager</h1>
              <p className="text-xs text-muted-foreground">
                Model Context Protocol
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
