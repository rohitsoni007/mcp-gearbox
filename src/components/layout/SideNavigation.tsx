import { useState } from 'react';
import Sidebar from '../Sidebar';
import AgentPanel from '../AgentPanel';
import { menus } from '@/utils/constants';

export default function SideNavigation() {
  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState(true);

  return (
    <>
      {/* Left Sidebar */}
      <Sidebar
        menus={menus}
        onToggleAgentPanel={() => setIsAgentPanelOpen(!isAgentPanelOpen)}
        isAgentPanelOpen={isAgentPanelOpen}
      />

      {/* Agent Panel */}
      <AgentPanel isOpen={isAgentPanelOpen} />
    </>
  );
}
