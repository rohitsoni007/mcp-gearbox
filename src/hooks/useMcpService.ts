import { useState, useEffect } from 'react';
import {
  McpRendererService,
  McpParsedResult,
} from '@/services/mcpRendererService';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/commonFunctions';
import { AgentData, AgentServer, ServerData } from '@/types/mcp';

export const useMcpService = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  const showNotInstalledToast = () => {
    toast({
      title: 'MCP CLI not installed',
      description: 'Please install MCP CLI first.',
      variant: 'destructive',
    });
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
    successMessage?: { title: string; description: string }
  ): Promise<T | null> => {
    if (!isInstalled) {
      showNotInstalledToast();
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
      if (successMessage) {
        showSuccessToast(successMessage.title, successMessage.description);
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

  const checkInstallation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const installed = await McpRendererService.isInstalled();
      setIsInstalled(installed);

      // Auto-install on first run if not installed
      if (!installed) {
        const installAttempted = localStorage.getItem('mcp-install-attempted');
        if (!installAttempted) {
          localStorage.setItem('mcp-install-attempted', 'true');
          const installSuccess = await installCli();
          if (!installSuccess) {
            setError('MCP CLI is not installed. Please install it manually.');
          }
        } else {
          setError('MCP CLI is not installed. Please install it first.');
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
    args: string[]
  ): Promise<McpParsedResult | null> => {
    return executeWithInstallCheck<McpParsedResult>(
      () => McpRendererService.executeCommand(args),
      'Command failed'
    );
  };

  const getAgents = async (): Promise<AgentData[]> => {
    const result = await executeWithInstallCheck<{ agents: AgentData[] }>(
      () => McpRendererService.getAgents(),
      'Failed to get agents'
    );
    return result?.agents || [];
  };

  const getServers = async (): Promise<ServerData[] | null> => {
    return executeWithInstallCheck<ServerData[]>(
      () => McpRendererService.getServers(),
      'Failed to get servers'
    );
  };

  const getServersByAgent = async (
    agent: string
  ): Promise<AgentServer[] | null> => {
    const result = await executeWithInstallCheck<{ servers: AgentServer[] }>(
      () => McpRendererService.getServersByAgent(agent),
      'Failed to get servers by agent'
    );
    return result?.servers || [];
  };

  const addServerByAgent = async (
    agent: string,
    serverName: string
  ): Promise<unknown> => {
    return executeWithInstallCheck<unknown>(
      () => McpRendererService.addServerByAgent(agent, serverName),
      'Failed to add server',
      {
        title: 'Server added',
        description: `Successfully added ${serverName} to ${agent}`,
      }
    );
  };

  const removeServerByAgent = async (
    serverName: string,
    agent: string
  ): Promise<unknown> => {
    return executeWithInstallCheck<unknown>(
      () => McpRendererService.removeServerByAgent(serverName, agent),
      'Failed to remove server',
      {
        title: 'Server removed',
        description: `Successfully removed ${serverName} from ${agent}`,
      }
    );
  };

  useEffect(() => {
    checkInstallation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
