import Claude from './AgentSVG/Claude';
import Continue from './AgentSVG/Continue';
import Kiro from './AgentSVG/Kiro';
import Copilot from './AgentSVG/Copilot';
import CopilotCLI from './AgentSVG/CopilotCLI';
import type { Agent } from '@/store/slices/agentSlice';

// Import icons as modules to ensure they're handled by Vite
import geminiIcon from '/icons/gemini.png';
import antigravityIcon from '/icons/antigravity.png';
import cursorIcon from '/icons/cursor.png';
import qoderIcon from '/icons/qoder.png';
import lmstudioIcon from '/icons/lmstudio.webp';

interface AgentIconProps {
  agent: Agent | null;
  className?: string;
}

export default function AgentIcon({ agent, className }: AgentIconProps) {
  const ImgClass = className || 'h-6 w-6 object-contain';

  // Handle null case
  if (!agent) {
    return <span className="text-2xl">🤖</span>;
  }

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
    case 'antigravity':
      return (
        <img src={antigravityIcon} alt={agent.name} className={ImgClass} />
      );
    case 'gemini':
      return <img src={geminiIcon} alt={agent.name} className={ImgClass} />;
    case 'cursor':
      return <img src={cursorIcon} alt={agent.name} className={ImgClass} />;
    case 'qoder':
      return <img src={qoderIcon} alt={agent.name} className={ImgClass} />;
    case 'lmstudio':
      return <img src={lmstudioIcon} alt={agent.name} className={ImgClass} />;
    default:
      return <span className="text-2xl">🤖</span>;
  }
}
