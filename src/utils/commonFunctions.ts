export const getErrorMessage = (err: unknown): string => {
  return err instanceof Error ? err.message : 'Command execution failed';
};

import { ServerData } from '@/types/mcp';
import { AgentData } from '@/types/mcp';

export const filterServers = (
  servers: ServerData[],
  query: string
): ServerData[] => {
  if (!Array.isArray(servers) || !query) return servers || [];

  const lowerQuery = query.toLowerCase().trim();
  return servers.filter(server => {
    const nameMatch = server.name?.toLowerCase().includes(lowerQuery) || false;
    const byMatch = server.by?.toLowerCase().includes(lowerQuery) || false;
    return nameMatch || byMatch;
  });
};

export const sortServers = (
  servers: ServerData[],
  sortBy: string
): ServerData[] => {
  if (!Array.isArray(servers)) return [];

  const serversCopy = [...servers];

  return serversCopy.sort((a, b) => {
    // First, sort by status (isEnabled) - enabled servers first
    const statusA = a.isEnabled ? 1 : 0;
    const statusB = b.isEnabled ? 1 : 0;

    if (statusA !== statusB) {
      return statusB - statusA;
    }

    // Then sort by the selected key
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'stars':
        return b.stargazer_count - a.stargazer_count;
      default:
        return 0;
    }
  });
};

export const formatStars = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const sortAgents = (agents: AgentData[]): AgentData[] => {
  if (!Array.isArray(agents)) return [];

  return [...agents].sort((a, b) => {
    if (a.installed === b.installed) {
      return a.name.localeCompare(b.name);
    }
    return a.installed ? -1 : 1;
  });
};
