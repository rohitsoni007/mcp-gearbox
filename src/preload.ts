// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { McpIpcApi } from './types/electronMcp';

const mcpApi: McpIpcApi = {
  isInstalled: () => ipcRenderer.invoke('mcp:is-installed'),
  executeCommand: (args: string[]) =>
    ipcRenderer.invoke('mcp:execute-command', args),
  installCli: () => ipcRenderer.invoke('mcp:install-cli'),
};

contextBridge.exposeInMainWorld('mcpApi', mcpApi);
