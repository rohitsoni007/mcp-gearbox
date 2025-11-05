import { useState } from "react";
import { MCPServer } from "@/types/mcp";
import { ServerCard } from "./ServerCard";
import { Input } from "@/components/ui/input";
import { Search, LayoutGrid, LayoutList } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AddServerDialog } from "./AddServerDialog";

interface AgentPanelProps {
  servers: MCPServer[];
  onToggleServer: (id: string, enabled: boolean) => void;
  onAddServer?: (server: { name: string; description: string; version: string; category?: string; icon?: string }) => void;
}

export function AgentPanel({ servers, onToggleServer, onAddServer }: AgentPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = servers.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search servers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {onAddServer && <AddServerDialog onAddServer={onAddServer} />}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {activeCount} of {servers.length} servers active
        </div>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "list" | "grid")}>
          <ToggleGroupItem value="list" aria-label="List view">
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "grid gap-4"}>
        {filteredServers.length > 0 ? (
          filteredServers.map((server) => (
            <ServerCard key={server.id} server={server} onToggle={onToggleServer} />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground col-span-full">
            No servers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
