import { useAppSelector } from '@/store/hooks';
import {
  selectActiveAgent,
  selectActiveAgentId,
} from '@/store/selectors/agentSelectors';

/**
 * Hook to get the currently active agent
 * @returns The active agent object or null if none selected
 */
export const useActiveAgent = () => {
  return useAppSelector(selectActiveAgent);
};

/**
 * Hook to get the active agent ID
 * @returns The active agent ID or null if none selected
 */
export const useActiveAgentId = () => {
  return useAppSelector(selectActiveAgentId);
};
