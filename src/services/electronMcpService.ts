// This file demonstrates how to use mcp-gearbox in the Electron main process
// You can expose these functions to the renderer process via IPC if needed

import { ipcMain } from 'electron';
import { executeMcpCli, isMcpCliInstalled } from 'mcp-gearbox';

export class ElectronMcpService {
  static setupIpcHandlers() {
    // Check if MCP CLI is installed
    ipcMain.handle('mcp:is-installed', async () => {
      try {
        return await isMcpCliInstalled();
      } catch (error) {
        console.error('Error checking MCP CLI installation:', error);
        return false;
      }
    });

    // Execute custom command
    ipcMain.handle('mcp:execute-command', async (_, args: string[]) => {
      try {
        return await executeMcpCli(args, { stdio: 'pipe' });
      } catch (error) {
        console.error('Error executing command:', error);
        throw error;
      }
    });
  }

  static removeIpcHandlers() {
    ipcMain.removeAllListeners('mcp:is-installed');
    ipcMain.removeAllListeners('mcp:execute-command');
  }
}