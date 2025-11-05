import { MCPServer } from "@/types/mcp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Trash2 } from "lucide-react";

interface ServerCardProps {
  server: MCPServer;
  onToggle: (id: string, enabled: boolean) => void;
  onConfigure?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ServerCard({ server, onToggle, onConfigure, onDelete }: ServerCardProps) {
  return (
    <Card className="transition-smooth hover:shadow-elegant">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{server.name}</CardTitle>
              <Badge variant={server.status === "active" ? "default" : "secondary"} className="text-xs">
                v{server.version}
              </Badge>
            </div>
            <CardDescription>{server.description}</CardDescription>
          </div>
          <Switch
            checked={server.enabled}
            onCheckedChange={(checked) => onToggle(server.id, checked)}
            className="ml-4"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {server.category && (
              <Badge variant="outline" className="text-xs">
                {server.category}
              </Badge>
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`h-2 w-2 rounded-full ${
                  server.status === "active"
                    ? "bg-success"
                    : server.status === "error"
                    ? "bg-destructive"
                    : "bg-muted-foreground"
                }`}
              />
              <span className="text-xs text-muted-foreground capitalize">{server.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onConfigure && (
              <Button variant="ghost" size="icon" onClick={() => onConfigure(server.id)}>
                <Settings className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" onClick={() => onDelete(server.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
