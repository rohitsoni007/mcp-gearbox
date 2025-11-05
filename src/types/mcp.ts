export type AgentType = "claude" | "gemini" | "cursor";

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
  status: "active" | "inactive" | "error";
  icon?: string;
  category?: string;
}

export interface AgentConfig {
  name: string;
  displayName: string;
  icon: string;
  description: string;
}
