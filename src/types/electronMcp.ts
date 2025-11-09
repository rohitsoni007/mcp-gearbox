// Types for Electron IPC MCP service
export interface McpIpcApi {
  isInstalled: () => Promise<boolean>;
  executeCommand: (
    args: string[]
  ) => Promise<{ code: number; stdout: string; stderr: string }>;
  installCli: () => Promise<{
    success: boolean;
    stdout?: string;
    stderr?: string;
    error?: string;
  }>;
}

declare global {
  interface Window {
    mcpApi?: McpIpcApi;
  }
}
