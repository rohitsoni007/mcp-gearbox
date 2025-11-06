import { Server, Star, MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ServerCardProps {
  name: string;
  description: string;
  author: string;
  stars: string;
  status: "online" | "offline" | "restarting";
  isEnabled: boolean;
  onToggle: () => void;
  view?: "grid" | "list";
  index?: number;
}

export default function ServerCard({
  name,
  description,
  author,
  stars,
  status,
  isEnabled,
  onToggle,
  view = "grid",
  index = 0,
}: ServerCardProps) {
  const animationDelay = `${index * 100}ms`;
  if (view === "list") {
    return (
      <div 
        className="glass-card group relative overflow-hidden rounded-2xl p-4 transition-all hover:border-primary/50 animate-fade-in"
        style={{ animationDelay }}
      >
        <div className="flex items-center gap-6">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
            <Server className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">{description}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "status-dot",
                  status === "online" && "bg-status-online",
                  status === "offline" && "bg-status-offline",
                  status === "restarting" && "bg-status-restarting"
                )}
              />
              <span className={cn(
                "text-xs font-medium capitalize",
                status === "online" && "text-status-online",
                status === "offline" && "text-status-offline",
                status === "restarting" && "text-status-restarting"
              )}>
                {status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>By {author}</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>{stars}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isEnabled} onCheckedChange={onToggle} />
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-primary/50 animate-fade-in"
      style={{ animationDelay }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "status-dot",
                status === "online" && "bg-status-online",
                status === "offline" && "bg-status-offline",
                status === "restarting" && "bg-status-restarting"
              )}
            />
            <span className={cn(
              "text-xs font-medium capitalize",
              status === "online" && "text-status-online",
              status === "offline" && "text-status-offline",
              status === "restarting" && "text-status-restarting"
            )}>
              {status}
            </span>
          </div>
        </div>
      </div>
      
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>By {author}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{stars}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={isEnabled} onCheckedChange={onToggle} />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
