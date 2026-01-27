import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import ServerCard from '../ServerCard';
import { useMcpService } from '@/hooks/useMcpService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setServers } from '@/store/slices/serverSlice';
import {
  selectAllServers,
  selectProjectLocation,
  selectSearchQuery,
  selectSortBy,
} from '@/store/selectors/serverSelectors';
import { useActiveAgent } from '@/hooks/useActiveAgent';
import { ServerData } from '@/types/mcp';
import { filterServers, sortServers } from '@/utils/commonFunctions';
import { ONE_HOUR_MS } from '@/utils/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { ReusablePagination } from '@/components/Pagination';

type ServerListProps = {
  view: 'grid' | 'list';
};

export default function ServerList({ view }: ServerListProps) {
  const dispatch = useAppDispatch();
  const servers = useAppSelector(selectAllServers);
  const searchQuery = useAppSelector(selectSearchQuery);
  const sortBy = useAppSelector(selectSortBy);
  const lastFetched = useAppSelector(state => state.server.lastFetched);
  const activeAgent = useActiveAgent();
  const projectLocation = useAppSelector(selectProjectLocation);
  const {
    getServers,
    getServersByAgent,
    addServerByAgent,
    removeServerByAgent,
    isInstalled,
  } = useMcpService();

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Memoized filtering
  const filteredServers = useMemo(() => {
    return filterServers(servers, searchQuery);
  }, [servers, searchQuery]);

  // Memoized sorting
  const sortedServers = useMemo(() => {
    return sortServers(filteredServers, sortBy);
  }, [filteredServers, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedServers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedServers = sortedServers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  useEffect(() => {
    const fetchServers = async () => {
      if (!isInstalled) {
        setIsInitialLoading(false);
        return;
      }

      setIsInitialLoading(true);

      const now = Date.now();
      const isStale = !lastFetched || now - lastFetched > ONE_HOUR_MS;

      // Only fetch agent servers if activeAgent is available
      let agentServers = null;
      if (activeAgent?.agent) {
        agentServers = await getServersByAgent(
          activeAgent.agent,
          projectLocation
        );
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
        await dispatch(setServers(serversArray || []));
      } else {
        // Update enabled status on cached servers
        const updatedServers = servers.map(server => ({
          ...server,
          isEnabled: agentServers?.some(
            agentServer => agentServer.name === server.name
          ),
        }));
        await dispatch(setServers(updatedServers));
      }

      setIsInitialLoading(false);
    };

    fetchServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInstalled, activeAgent?.agent, projectLocation]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the server list when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isInitialLoading) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        <div
          className={cn(
            'gap-4',
            view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col'
          )}
        >
          {[...Array(itemsPerPage)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <ReusablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
      {sortedServers.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No servers found</p>
        </div>
      ) : (
        <>
          <div
            className={cn(
              'gap-4',
              view === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col'
            )}
          >
            {paginatedServers.map((server, index) => (
              <ServerCard
                key={Object.keys(server.mcp)[0] || server.name}
                view={view}
                index={index}
                server={server}
                addServerByAgent={(agent: string, serverName: string) =>
                  addServerByAgent(agent, serverName, projectLocation)
                }
                removeServerByAgent={(serverName: string, agent: string) =>
                  removeServerByAgent(serverName, agent, projectLocation)
                }
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-2 flex justify-center">
              <ReusablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
