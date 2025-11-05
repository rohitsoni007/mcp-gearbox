// Renderer-safe MCP service that uses IPC communication
export interface McpCommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

export class McpRendererService {
  private static get mcpApi() {
    if (!window.mcpApi) {
      throw new Error(
        'MCP API not available. Make sure the preload script is loaded.'
      );
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

  /**
   * Get servers by agent using MCP CLI
   */
  static async getServersByAgent(agent: string): Promise<McpCommandResult> {
    try {
      return await this.mcpApi.executeCommand(['list', '-a', agent, '-j']);
    } catch (error) {
      console.error('Error getting servers by agent:', error);
      throw error;
    }
  }

  /**
   * Get servers using MCP CLI
   */
  static async getServers(): Promise<McpCommandResult> {
    try {
      return await this.mcpApi.executeCommand(['list', '-s']);
    } catch (error) {
      console.error('Error getting servers:', error);
      throw error;
    }
  }

  /**
   * Remove server by agent using MCP CLI
   */
  static async removeServerByAgent(
    serverName: string,
    agent: string
  ): Promise<McpCommandResult> {
    try {
      return await this.mcpApi.executeCommand(['rm', serverName, '-a', agent, '-j']);
    } catch (error) {
      console.error('Error removing server by agent:', error);
      throw error;
    }
  }

  /**
   * Add server by agent using MCP CLI
   */
  static async addServerByAgent(
    agent: string,
    serverName: string
  ): Promise<McpCommandResult> {
    try {
      return await this.mcpApi.executeCommand([
        'init',
        '-a',
        agent,
        '-s',
        serverName,
        '--json',
      ]);
    } catch (error) {
      console.error('Error adding server by agent:', error);
      throw error;
    }
  }

  /**
   * Get agents using MCP CLI
   */
  static async getAgents(): Promise<McpCommandResult> {
    try {
      return await this.mcpApi.executeCommand(['check', '-j']);
    } catch (error) {
      console.error('Error getting agents:', error);
      throw error;
    }
  }
}

// Direct exports for convenience
export const isInstalled = McpRendererService.isInstalled;
export const executeCommand = McpRendererService.executeCommand;
export const getServersByAgent = McpRendererService.getServersByAgent;
export const getServers = McpRendererService.getServers;
export const removeServerByAgent = McpRendererService.removeServerByAgent;
export const addServerByAgent = McpRendererService.addServerByAgent;
export const getAgents = McpRendererService.getAgents;
