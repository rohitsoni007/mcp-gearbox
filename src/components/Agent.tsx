import Claude from './AgentSVG/Claude';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveAgent } from '@/store/slices/agentSlice';
import type { Agent } from '@/store/slices/agentSlice';
import Continue from './AgentSVG/Continue';
import Kiro from './AgentSVG/Kiro';
import Copilot from './AgentSVG/Copilot';
import CopilotCLI from './AgentSVG/CopilotCLI';

// Import icons as modules to ensure they're handled by Vite
import geminiIcon from '/icons/gemini.png';
import cursorIcon from '/icons/cursor.png';
import qoderIcon from '/icons/qoder.png';
import lmstudioIcon from '/icons/lmstudio.webp';

interface AgentProps {
  agent: Agent;
}

function getAgentIcon(agent: Agent) {
  const ImgClass = 'h-6 w-6 object-contain';
  switch (agent.agent) {
    case 'claude':
      return <Claude />;
    case 'continue':
      return <Continue />;
    case 'kiro':
      return <Kiro />;
    case 'copilot-cli':
      return <CopilotCLI />;
    case 'copilot':
      return <Copilot />;
    case 'gemini':
      return (
        <img src={geminiIcon} alt={agent.name} className={ImgClass} />
      );
    case 'cursor':
      return (
        <img src={cursorIcon} alt={agent.name} className={ImgClass} />
      );
    case 'qoder':
      return (
        <img src={qoderIcon} alt={agent.name} className={ImgClass} />
      );
    case 'lmstudio':
      return (
        <img src={lmstudioIcon} alt={agent.name} className={ImgClass} />
      );
    default:
      return <span className="text-2xl">🤖</span>;
  }
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
      {getAgentIcon(agent)}
      <span className="flex-1 text-sm font-medium">{agent.name}</span>
      {agent.installed && <span className="status-dot bg-status-online" />}
    </button>
  );
}