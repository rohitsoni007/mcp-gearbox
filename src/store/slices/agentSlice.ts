import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Agent {
  agent: string;
  name: string;
  installed: boolean;
  config_exists: boolean;
  config_path: string;
  cli_available: boolean;
  install_url: string;
  details: string[];
  active?: boolean;
}

interface AgentState {
  agents: Agent[];
  activeAgentId: string | null;
  lastFetched: number | null;
}

const initialState: AgentState = {
  agents: [],
  activeAgentId: null,
  lastFetched: null,
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
      state.lastFetched = Date.now();
    },
    setActiveAgent: (state, action: PayloadAction<string>) => {
      state.activeAgentId = action.payload;
    },
    updateAgent: (state, action: PayloadAction<Agent>) => {
      const index = state.agents.findIndex(
        agent => agent.agent === action.payload.agent
      );
      if (index !== -1) {
        state.agents[index] = action.payload;
      }
    },
  },
});

export const { setAgents, setActiveAgent, updateAgent } = agentSlice.actions;
export default agentSlice.reducer;
