import { useState } from "react";
import { AgentType } from "@/types/mcp";
import { mockServers } from "@/data/mockServers";
import { AgentPanel } from "@/components/AgentPanel";
import { McpStatus } from "@/components/McpStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Heading } from "@/components/home/Heading";

const Index = () => {
  const [activeAgent, setActiveAgent] = useState<AgentType>("claude");
  const [servers, setServers] = useState(mockServers);
  const { toast } = useToast();

  const handleToggleServer = (agentId: string, serverId: string, enabled: boolean) => {
    setServers((prev) => ({
      ...prev,
      [agentId]: prev[agentId].map((server) =>
        server.id === serverId
          ? { ...server, enabled, status: enabled ? ("active" as const) : ("inactive" as const) }
          : server
      ),
    }));

    toast({
      title: enabled ? "Server enabled" : "Server disabled",
      description: `Successfully ${enabled ? "enabled" : "disabled"} the MCP server.`,
    });
  };

  const handleAddServer = (agentId: AgentType, serverData: { name: string; description: string; version: string; category?: string; icon?: string }) => {
    const newServer = {
      id: `server-${Date.now()}`,
      name: serverData.name,
      description: serverData.description,
      version: serverData.version,
      enabled: false,
      status: "inactive" as const,
      icon: serverData.icon,
      category: serverData.category,
    };

    setServers((prev) => ({
      ...prev,
      [agentId]: [...prev[agentId], newServer],
    }));

    toast({
      title: "Server added",
      description: `Successfully added ${serverData.name} to ${agentId}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Heading
        title="MCP Gearbox"
        description="Install and configure MCP servers for your AI agents"
      />

      <Tabs value={activeAgent} onValueChange={(v) => setActiveAgent(v as AgentType)} className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-4">
          <TabsTrigger value="claude" className="gap-2">
            <div className="h-4 w-4 rounded-full bg-gradient-primary" />
            Claude
          </TabsTrigger>
          <TabsTrigger value="gemini" className="gap-2">
            <div className="h-4 w-4 rounded-full bg-gradient-accent" />
            Gemini
          </TabsTrigger>
          <TabsTrigger value="cursor" className="gap-2">
            <div className="h-4 w-4 rounded-full bg-muted-foreground" />
            Cursor
          </TabsTrigger>
          <TabsTrigger value="cli" className="gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-500" />
            CLI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="claude" className="space-y-4">
          <AgentPanel
            servers={servers.claude}
            onToggleServer={(id, enabled) => handleToggleServer("claude", id, enabled)}
            onAddServer={(serverData) => handleAddServer("claude", serverData)}
          />
        </TabsContent>

        <TabsContent value="gemini" className="space-y-4">
          <AgentPanel
            servers={servers.gemini}
            onToggleServer={(id, enabled) => handleToggleServer("gemini", id, enabled)}
            onAddServer={(serverData) => handleAddServer("gemini", serverData)}
          />
        </TabsContent>

        <TabsContent value="cursor" className="space-y-4">
          <AgentPanel
            servers={servers.cursor}
            onToggleServer={(id, enabled) => handleToggleServer("cursor", id, enabled)}
            onAddServer={(serverData) => handleAddServer("cursor", serverData)}
          />
        </TabsContent>

        <TabsContent value="cli" className="space-y-4">
          <McpStatus />
        </TabsContent>
      </Tabs>
    </div>

  );
};

export default Index;
