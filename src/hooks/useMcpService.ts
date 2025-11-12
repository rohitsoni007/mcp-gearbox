import { useState, useEffect } from 'react';
import {
  McpRendererService,
  McpParsedResult,
} from '@/services/mcpRendererService';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage, compareVersions } from '@/utils/commonFunctions';
import { AgentData, AgentServer, ServerData } from '@/types/mcp';
import { CLI_VERSION } from '@/utils/constants';

export const useMcpService = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [version, setVersion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  const showNotInstalledToast = (showToast: boolean = true) => {
    if (showToast) {
      toast({
        title: 'MCP CLI not installed',
        description: 'Please install MCP CLI first.',
        variant: 'destructive',
      });
    }
  };

  const showErrorToast = (title: string, description: string) => {
    toast({
      title,
      description,
      variant: 'destructive',
    });
  };

  const showSuccessToast = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  };

  const handleError = (err: unknown, title: string) => {
    const errorMessage = getErrorMessage(err);
    setError(errorMessage);
    showErrorToast(title, errorMessage);
  };

  const executeWithInstallCheck = async <T>(
    operation: () => Promise<McpParsedResult>,
    errorTitle: string,
    _successMessage?: { title: string; description: string },
    showToast: boolean = true
  ): Promise<T | null> => {
    if (!isInstalled) {
      showNotInstalledToast(showToast);
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await operation();
      if (!result.success) {
        setError(result.error);
        showErrorToast(errorTitle, result.error || errorTitle);
        return null;
      }
      
      return result.data as T;
    } catch (err) {
      handleError(err, errorTitle);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const installCli = async () => {
    setIsInstalling(true);
    setError(null);
    try {
      toast({
        title: 'Installing MCP CLI',
        description:
          'Installing mcp-gearbox globally. This may take a moment...',
      });

      const result = await McpRendererService.installCli();

      if (result.success) {
        setIsInstalled(true);
        showSuccessToast(
          'Installation successful',
          'MCP CLI has been installed successfully'
        );
        return true;
      } else {
        setError(result.error || 'Installation failed');
        showErrorToast(
          'Installation failed',
          result.error || 'Failed to install MCP CLI'
        );
        return false;
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      showErrorToast('Installation failed', errorMessage);
      return false;
    } finally {
      setIsInstalling(false);
    }
  };

  const checkInstallation = async (showToast: boolean = true) => {
    setIsLoading(true);
    setError(null);
    try {
      const installed = await McpRendererService.isInstalled();
      setIsInstalled(installed);

      // If CLI is installed, check version
      if (installed) {
        const currentVersion = await McpRendererService.getVersion();
        if (currentVersion.success && typeof currentVersion.data === 'string') {
          const currentVersionStr = currentVersion.data.trim();
          // Compare versions: if CLI_VERSION > currentVersion, install new version
          if (compareVersions(CLI_VERSION, currentVersionStr) > 0) {
            toast({
              title: 'New version available',
              description: `Updating MCP CLI from ${currentVersionStr} to ${CLI_VERSION}`,
            });
            const installSuccess = await installCli();
            if (!installSuccess) {
              setError('Failed to update MCP CLI to the latest version.');
            }
          }
        }
      } 
      // Auto-install on first run if not installed
      else {
        const installAttempted = localStorage.getItem('mcp-install-attempted');
        if (!installAttempted) {
          localStorage.setItem('mcp-install-attempted', 'true');
          const installSuccess = await installCli();
          if (!installSuccess && showToast) {
            setError('MCP CLI is not installed. Please install it manually.');
          }
        }
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setIsInstalled(false);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCommand = async (
    args: string[],
    showToast: boolean = true
  ): Promise<McpParsedResult | null> => {
    return executeWithInstallCheck<McpParsedResult>(
      () => McpRendererService.executeCommand(args),
      'Command failed',
      undefined,
      showToast
    );
  };

  const getAgents = async (showToast: boolean = true): Promise<AgentData[]> => {
    const result = await executeWithInstallCheck<{ agents: AgentData[] }>(
      () => McpRendererService.getAgents(),
      'Failed to get agents',
      undefined,
      showToast
    );
    return result?.agents || [];
  };

  const getServers = async (showToast: boolean = true): Promise<ServerData[] | null> => {
    return executeWithInstallCheck<ServerData[]>(
      () => McpRendererService.getServers(),
      'Failed to get servers',
      undefined,
      showToast
    );
  };

  const getServersByAgent = async (
    agent: string,
    showToast: boolean = true
  ): Promise<AgentServer[] | null> => {
    const result = await executeWithInstallCheck<{ servers: AgentServer[] }>(
      () => McpRendererService.getServersByAgent(agent),
      'Failed to get servers by agent',
      undefined,
      showToast
    );
    return result?.servers || [];
  };

  const addServerByAgent = async (
    agent: string,
    serverName: string,
    showToast: boolean = true
  ): Promise<unknown> => {
    return executeWithInstallCheck<unknown>(
      () => McpRendererService.addServerByAgent(agent, serverName),
      'Failed to add server',
      {
        title: 'Server added',
        description: `Successfully added ${serverName} to ${agent}`,
      },
      showToast
    );
  };

  const removeServerByAgent = async (
    serverName: string,
    agent: string,
    showToast: boolean = true
  ): Promise<unknown> => {
    return executeWithInstallCheck<unknown>(
      () => McpRendererService.removeServerByAgent(serverName, agent),
      'Failed to remove server',
      {
        title: 'Server removed',
        description: `Successfully removed ${serverName} from ${agent}`,
      },
      showToast
    );
  };

  const getVersion = async (showToast: boolean = true): Promise<unknown> => {
    const result = await executeWithInstallCheck<unknown>(
      () => McpRendererService.getVersion(),
      'Failed to get version',
      {
        title: 'Server version',
        description: 'Successfully got the version',
      },
      showToast
    );
    setVersion(result as string | null)
    return result;
  };

  useEffect(() => {
    checkInstallation(false); // Don't show toast on initial check
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  useEffect(() => {
    getVersion(false); // Don't show toast on initial version check
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstalled]);

  return {
    isInstalled,
    isLoading,
    isInstalling,
    error,
    checkInstallation,
    installCli,
    executeCommand,
    getAgents,
    getServers,
    getServersByAgent,
    addServerByAgent,
    removeServerByAgent,
  };
};