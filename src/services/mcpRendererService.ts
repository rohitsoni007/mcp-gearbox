// Renderer-safe MCP service that uses IPC communication
export interface McpCommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

export class McpRendererService {
  private static get mcpApi() {
    if (!window.mcpApi) {
      throw new Error('MCP API not available. Make sure the preload script is loaded.');
    }
    return window.mcpApi;
  }

  /**
   * Check if MCP CLI is installed and available
   */
  static async isInstalled(): Promise<boolean> {
    try {
      return await this.mcpApi.isInstalled();
    } catch (error) {
      console.error('Error checking MCP CLI installation:', error);
      return false;
    }
  }

  /**
   * Execute custom MCP CLI command
   */
  static async executeCommand(args: string[]): Promise<McpCommandResult> {
    try {
      return await this.mcpApi.executeCommand(args);
    } catch (error) {
      console.error('Error executing MCP command:', error);
      throw error;
    }
  }
}