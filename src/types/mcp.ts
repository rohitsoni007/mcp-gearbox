// New interface for agent data based on the provided structure
export interface AgentData {
  agent: string;
  name: string;
  installed: boolean;
  config_exists: boolean;
  config_path: string;
  cli_available: boolean;
  install_url: string;
  details: string[];
}

// Interface for server data returned by getServersByAgent
export interface AgentServer {
  name: string;
  by: string;
  stargazer_count: number;
  configured_name: string;
  mcp_key: string;
  description: string;
}

// Interface for server data returned by getServers
export interface ServerData {
  name: string;
  description: string;
  mcp: Record<string, unknown>;
  stargazer_count: number;
  by: string;
  isEnabled?: boolean;
}
