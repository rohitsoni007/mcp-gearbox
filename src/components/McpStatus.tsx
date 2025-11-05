import { useState } from 'react';
import { useMcpService } from '@/hooks/useMcpService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export const McpStatus = () => {
  const {
    isInstalled,
    isLoading,
    error,
    checkInstallation,
    executeCommand,
  } = useMcpService();

  const [commandArgs, setCommandArgs] = useState('');
  const [commandOutput, setCommandOutput] = useState('');

  const handleExecuteCommand = async () => {
    if (!commandArgs.trim()) return;
    
    const args = commandArgs.trim().split(' ').filter(arg => arg.length > 0);
    const result = await executeCommand(args);
    if (result) {
      setCommandOutput(result.stdout || result.stderr);
    }
  };

  const handleListServers = async () => {
    const result = await executeCommand(['list']);
    if (result) {
      setCommandOutput(result.stdout || result.stderr);
    }
  };

  const handleGetVersion = async () => {
    const result = await executeCommand(['--version']);
    if (result) {
      setCommandOutput(result.stdout || result.stderr);
    }
  };

  const handleShowHelp = async () => {
    const result = await executeCommand(['--help']);
    if (result) {
      setCommandOutput(result.stdout || result.stderr);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            MCP CLI Status
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
          <CardDescription>
            Check and manage your MCP CLI installation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={isInstalled ? "default" : "destructive"} className="flex items-center gap-1">
              {isInstalled ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {isInstalled ? 'Installed' : 'Not Installed'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={checkInstallation}
              disabled={isLoading}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {isInstalled && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>MCP Commands</CardTitle>
              <CardDescription>
                Execute MCP CLI commands
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleListServers} disabled={isLoading}>
                  List Servers
                </Button>
                <Button onClick={handleGetVersion} disabled={isLoading}>
                  Get Version
                </Button>
                <Button onClick={handleShowHelp} disabled={isLoading}>
                  Show Help
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commandArgs">Custom Command</Label>
                <div className="flex gap-2">
                  <Input
                    id="commandArgs"
                    placeholder="e.g., install filesystem, list, --version"
                    value={commandArgs}
                    onChange={(e) => setCommandArgs(e.target.value)}
                  />
                  <Button onClick={handleExecuteCommand} disabled={isLoading || !commandArgs.trim()}>
                    Execute
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {commandOutput && (
            <Card>
              <CardHeader>
                <CardTitle>Command Output</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted p-4 rounded overflow-auto max-h-64">
                  {commandOutput}
                </pre>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};