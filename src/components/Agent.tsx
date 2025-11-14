import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveAgent } from '@/store/slices/agentSlice';
import type { Agent } from '@/store/slices/agentSlice';
import AgentIcon from './AgentIcon';

interface AgentProps {
  agent: Agent;
}

export default function Agent({ agent }: AgentProps) {
  const dispatch = useAppDispatch();
  const activeAgentId = useAppSelector(state => {
    return state.agent.activeAgentId;
  });

  const handleSelectAgent = (agentId: string) => {
    dispatch(setActiveAgent(agentId));
  };

  return (
    <button
      onClick={() => agent.installed && handleSelectAgent(agent.agent)}
      disabled={!agent.installed}
      className={cn(
        'flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all',
        agent.installed
          ? activeAgentId == agent.agent
            ? 'bg-primary/20 text-foreground'
            : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
          : 'text-muted-foreground/50',
        activeAgentId == agent.agent &&
          agent.installed &&
          'bg-primary/20 text-foreground'
      )}
    >
      <AgentIcon agent={agent} />
      <span className="flex-1 text-sm font-medium">{agent.name}</span>
      {agent.installed && <span className="status-dot bg-status-online" />}
    </button>
  );
}
