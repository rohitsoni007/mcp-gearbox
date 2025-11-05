import { useState, useEffect } from 'react';
import { McpRendererService, McpCommandResult } from '@/services/mcpRendererService';
import { useToast } from '@/hooks/use-toast';

export interface UseMcpServiceReturn {
  isInstalled: boolean;
  isLoading: boolean;
  error: string | null;
  checkInstallation: () => Promise<void>;
  executeCommand: (args: string[]) => Promise<McpCommandResult | null>;
}

export const useMcpService = (): UseMcpServiceReturn => {
  const [isInstalled, setIsInstalled] = useState(false);
  console.log("🚀 ~ useMcpService ~ isInstalled:", isInstalled)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const checkInstallation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const installed = await McpRendererService.isInstalled();
      setIsInstalled(installed);
      if (!installed) {
        setError('MCP CLI is not installed. Please install it first.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsInstalled(false);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCommand = async (args: string[]): Promise<McpCommandResult | null> => {
    if (!isInstalled) {
      toast({
        title: "MCP CLI not installed",
        description: "Please install MCP CLI first.",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await McpRendererService.executeCommand(args);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Command execution failed';
      setError(errorMessage);
      toast({
        title: "Command failed",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Check installation status on mount
  useEffect(() => {
    checkInstallation();
  }, []);

  return {
    isInstalled,
    isLoading,
    error,
    checkInstallation,
    executeCommand,
  };
};