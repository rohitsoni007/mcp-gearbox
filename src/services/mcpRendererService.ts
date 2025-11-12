// Renderer-safe MCP service that uses IPC communication
export interface McpCommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

export interface McpParsedResult<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  raw: McpCommandResult;
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
   * Install MCP CLI globally
   */
  static async installCli(): Promise<{
    success: boolean;
    stdout?: string;
    stderr?: string;
    error?: string;
  }> {
    try {
      return await this.mcpApi.installCli();
    } catch (error) {
      console.error('Error installing MCP CLI:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Execute custom MCP CLI command and parse JSON result
   */
  static async executeCommand(args: string[]): Promise<McpParsedResult> {
    try {
      const result = await this.mcpApi.executeCommand(args);

      if (result.code !== 0) {
        return {
          success: false,
          data: null,
          error: result.stderr || 'Command failed',
          raw: result,
        };
      }

      try {
        const data = JSON.parse(result.stdout);
        return {
          success: true,
          data: data,
          error: null,
          raw: result,
        };
      } catch (error) {
        return {
          success: false,
          data: null,
          error: `Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`,
          raw: result,
        };
      }
    } catch (error) {
      console.error('Error executing MCP command:', error);
      throw error;
    }
  }

  /**
   * Get servers by agent using MCP CLI
   */
  static async getServersByAgent(agent: string): Promise<McpParsedResult> {
    try {
      return await this.executeCommand(['list', '-a', agent, '-j']);
    } catch (error) {
      console.error('Error getting servers by agent:', error);
      throw error;
    }
  }

  /**
   * Get servers using MCP CLI
   */
  static async getServers(): Promise<McpParsedResult> {
    try {
      return await this.executeCommand(['list', '-s', '-j']);
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
  ): Promise<McpParsedResult> {
    try {
      return await this.executeCommand(['rm', serverName, '-a', agent, '-j']);
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
  ): Promise<McpParsedResult> {
    try {
      return await this.executeCommand([
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
  static async getAgents(): Promise<McpParsedResult> {
    try {
      return await this.executeCommand(['check', '-j']);
    } catch (error) {
      console.error('Error getting agents:', error);
      throw error;
    }
  }

  /**
   * Get version using MCP CLI
   */
  static async getVersion(): Promise<McpParsedResult> {
    try {
      const result = await this.mcpApi.executeCommand(['-v']);
      return {
          success: true,
          data: result.stdout,
          error: null,
          raw: result,
        };
    } catch (error) {
      console.error('Error getting version:', error);
      throw error;
    }
  }

  
}
