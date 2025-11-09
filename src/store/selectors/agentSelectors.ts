import { RootState } from '../index';

export const selectActiveAgent = (state: RootState) => {
  const { agents, activeAgentId } = state.agent;
  return agents.find(agent => agent.agent === activeAgentId) || null;
};

export const selectAllAgents = (state: RootState) => state.agent.agents;

export const selectActiveAgentId = (state: RootState) =>
  state.agent.activeAgentId;

export const selectInstalledAgents = (state: RootState) =>
  state.agent.agents.filter(agent => agent.installed);
