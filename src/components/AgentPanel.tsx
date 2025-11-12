import { Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMcpService } from '@/hooks/useMcpService';
import { useEffect, useEffectEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAgents, setActiveAgent } from '@/store/slices/agentSlice';
import { sortAgents } from '@/utils/commonFunctions';
import { ONE_HOUR_MS } from '@/utils/constants';

interface AgentPanelProps {
  isOpen: boolean;
}


export default function AgentPanel({ isOpen }: AgentPanelProps) {
  const dispatch = useAppDispatch();
  const agents = useAppSelector(state => {
    return state.agent.agents;
  });
  const activeAgentId = useAppSelector(state => state.agent.activeAgentId);
  const lastFetched = useAppSelector(state => state.agent.lastFetched);
  const { isInstalled, isLoading, error, getAgents } = useMcpService();

  const getAgentsData = useEffectEvent(async () => {
    const fetchedAgents = await getAgents();
    if (fetchedAgents) {
      const sortedAgents = sortAgents(fetchedAgents);

      dispatch(setAgents(sortedAgents));

      // Set first agent as active if none selected
      if (!activeAgentId && sortedAgents.length > 0) {
        dispatch(setActiveAgent(sortedAgents[0].agent));
      }
    }
  });

  const handleSelectAgent = (agentId: string) => {
    dispatch(setActiveAgent(agentId));
  };

  // Compute agents with active flag
  const agentsWithActive = agents.map(agent => ({
    ...agent,
    active: agent.agent === activeAgentId,
  }));

  useEffect(() => {
    if (isInstalled) {
      const now = Date.now();
      const isStale = !lastFetched || now - lastFetched > ONE_HOUR_MS;

      // Only fetch if data is stale or doesn't exist
      if (isStale) {
        getAgentsData();
      } else if (!activeAgentId && agents.length > 0) {
        // Set first agent as active if none selected and we have cached data
        dispatch(setActiveAgent(agents[0].agent));
      }
    }
  }, [
    isInstalled,
    lastFetched,
    activeAgentId,
    agents,
    dispatch,
    getAgentsData,
  ]);

  return (
    <aside
      className={cn(
        'glass-sidebar flex h-full flex-col p-6 pl-1 pr-1 transition-all duration-300 ease-in-out overflow-hidden',
        isOpen ? 'w-42 opacity-100' : 'w-0 opacity-0 p-0'
      )}
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="text-xxl flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-sm font-semibold">AI Agents</h2>
          <p className="text-xs text-muted-foreground">Select an agent</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin">
        {!isInstalled && agents.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              MCP API not available
            </p>
            <p className="text-xs text-muted-foreground">
              Make sure the preload script is loaded
            </p>
          </div>
        )}
        {isInstalled && isLoading && agents.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {isInstalled && error && agents.length === 0 && (
          <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load agents
          </div>
        )}
        {isInstalled && !isLoading && !error && agents.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No agents found
          </div>
        )}
        {agentsWithActive.map(agent => (
          <button
            key={agent.agent}
            onClick={() => agent.installed && handleSelectAgent(agent.agent)}
            disabled={!agent.installed}
            className={cn(
              'flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all',
              agent.installed 
                ? agent.active
                  ? 'bg-primary/20 text-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
                : 'text-muted-foreground/50',
              agent.active && agent.installed && 'bg-primary/20 text-foreground'
            )}
          >
            {/* <span className="text-2xl">{agent.icon}</span> */}
            <span className="flex-1 text-sm font-medium">{agent.name}</span>
            {agent.installed && (
              <span className="status-dot bg-status-online" />
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
