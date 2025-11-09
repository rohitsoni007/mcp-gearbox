import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import ServerCard from '../ServerCard';
import { useMcpService } from '@/hooks/useMcpService';
import { Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setServers } from '@/store/slices/serverSlice';
import {
  selectAllServers,
  selectSearchQuery,
  selectServersLoading,
  selectSortBy,
} from '@/store/selectors/serverSelectors';
import { useActiveAgent } from '@/hooks/useActiveAgent';
import { ServerData } from '@/types/mcp';
import { filterServers, sortServers } from '@/utils/commonFunctions';

type ServerListProps = {
  view: 'grid' | 'list';
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function ServerList({ view }: ServerListProps) {
  const dispatch = useAppDispatch();
  const servers = useAppSelector(selectAllServers);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sortBy = useAppSelector(selectSortBy);
  const isLoadingFromStore = useAppSelector(selectServersLoading);
  const lastFetched = useAppSelector(state => state.server.lastFetched);
  const activeAgent = useActiveAgent();
  const {
    getServers,
    getServersByAgent,
    addServerByAgent,
    removeServerByAgent,
    isInstalled,
  } = useMcpService();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Memoized filtering
  const filteredServers = useMemo(() => {
    return filterServers(servers, searchQuery);
  }, [servers, searchQuery]);

  // Memoized sorting
  const sortedServers = useMemo(() => {
    return sortServers(filteredServers, sortBy);
  }, [filteredServers, sortBy]);

  useEffect(() => {
    const fetchServers = async () => {
      if (!isInstalled) {
        setIsInitialLoading(false);
        return;
      }

      const now = Date.now();
      const isStale = !lastFetched || now - lastFetched > ONE_DAY_MS;

      // Only show loader if we don't have cached data
      if (servers.length === 0) {
        setIsInitialLoading(true);
      }

      // Only fetch agent servers if activeAgent is available
      let agentServers = null;
      if (activeAgent?.agent) {
        agentServers = await getServersByAgent(activeAgent.agent);
      }

      // Only fetch all servers if data is stale
      if (isStale || servers.length === 0) {
        const result = await getServers();
        const serversArray = result?.map((server: ServerData) => {
          return {
            ...server,
            isEnabled: agentServers?.some(
              agentServer => agentServer.name === server.name
            ),
          };
        });
        dispatch(setServers(serversArray || []));
      } else {
        // Update enabled status on cached servers
        const updatedServers = servers.map(server => ({
          ...server,
          isEnabled: agentServers?.some(
            agentServer => agentServer.name === server.name
          ),
        }));
        dispatch(setServers(updatedServers));
      }

      setIsInitialLoading(false);
    };

    fetchServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstalled, activeAgent?.agent]);

  if ((isInitialLoading || isLoadingFromStore) && servers.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
      {sortedServers.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No servers found</p>
        </div>
      ) : (
        <div
          className={cn(
            'gap-4',
            view === 'grid'
              ? 'grid grid-cols-1 lg:grid-cols-2'
              : 'flex flex-col'
          )}
        >
          {sortedServers.map((server, index) => (
            <ServerCard
              key={Object.keys(server.mcp)[0] || server.name}
              view={view}
              index={index}
              server={server}
              addServerByAgent={addServerByAgent}
              removeServerByAgent={removeServerByAgent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
