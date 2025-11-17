import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Server {
  name: string;
  description: string;
  mcp: Record<string, unknown>;
  stargazer_count: number;
  by: string;
  isEnabled?: boolean;
  avatar_url: string;
}

interface ServerState {
  servers: Server[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: string;
  lastFetched: number | null;
  isProjectLevelSpecEnabled: boolean;
  projectLocation: string;
}

const initialState: ServerState = {
  servers: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  sortBy: 'stars',
  lastFetched: null,
  isProjectLevelSpecEnabled: false,
  projectLocation: '',
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<Server[]>) => {
      state.servers = action.payload;
      state.error = null;
      state.lastFetched = Date.now();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleServer: (state, action: PayloadAction<string>) => {
      const server = state.servers.find(s => s.name === action.payload);
      if (server) {
        server.isEnabled = !server.isEnabled;
      }
    },
    updateServer: (state, action: PayloadAction<Server>) => {
      const index = state.servers.findIndex(
        server => server.name === action.payload.name
      );
      if (index !== -1) {
        state.servers[index] = action.payload;
      }
    },
    addServer: (state, action: PayloadAction<Server>) => {
      state.servers.push(action.payload);
    },
    removeServer: (state, action: PayloadAction<string>) => {
      state.servers = state.servers.filter(
        server => server.name !== action.payload
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setProjectLevelSpecEnabled: (state, action: PayloadAction<boolean>) => {
      state.isProjectLevelSpecEnabled = action.payload;
    },
    setProjectLocation: (state, action: PayloadAction<string>) => {
      state.projectLocation = action.payload;
    },
  },
});

export const {
  setServers,
  setLoading,
  setError,
  toggleServer,
  updateServer,
  addServer,
  removeServer,
  setSearchQuery,
  setSortBy,
  setProjectLevelSpecEnabled,
  setProjectLocation,
} = serverSlice.actions;

export default serverSlice.reducer;
