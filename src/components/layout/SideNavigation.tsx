import Sidebar from '../Sidebar';
import AgentPanel from '../AgentPanel';
import { menus } from '@/utils/constants';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectIsAgentPanelOpen } from '@/store/selectors/agentSelectors';
import { setAgentPanelOpen } from '@/store/slices/agentSlice';

export default function SideNavigation() {
  const dispatch = useAppDispatch();
  const isAgentPanelOpen = useAppSelector(selectIsAgentPanelOpen);

  const setIsAgentPanelOpen = (isOpen: boolean) => {
    dispatch(setAgentPanelOpen(isOpen));
  };

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
