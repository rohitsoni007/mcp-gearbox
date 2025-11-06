import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  icon: string;
  isOnline: boolean;
}

const agents: Agent[] = [
  { id: "cursor", name: "Cursor", icon: "⚡", isOnline: true },
  { id: "github-copilot", name: "GitHub Copilot", icon: "💻", isOnline: true },
  { id: "continue", name: "Continue", icon: "🔄", isOnline: true },
  { id: "kiro", name: "Kiro", icon: "🧩", isOnline: false },
];

interface AgentPanelProps {
  isOpen: boolean;
}

export default function AgentPanel({ isOpen }: AgentPanelProps) {
  return (
    <aside 
      className={cn(
        "glass-sidebar flex h-full flex-col p-6 transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-80 opacity-100" : "w-0 opacity-0 p-0"
      )}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <User className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-sm font-semibold">Agents</h2>
          <p className="text-xs text-muted-foreground">Select an agent</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin">
        {agents.map((agent, index) => (
          <button
            key={agent.id}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all",
              index === 0
                ? "bg-primary/20 text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            )}
          >
            <span className="text-2xl">{agent.icon}</span>
            <span className="flex-1 text-sm font-medium">{agent.name}</span>
            {agent.isOnline && (
              <span className="status-dot bg-status-online" />
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
