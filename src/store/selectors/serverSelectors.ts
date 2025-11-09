import { RootState } from '../index';

export const selectAllServers = (state: RootState) => state.server.servers;

export const selectServersLoading = (state: RootState) =>
  state.server.isLoading;

export const selectServersError = (state: RootState) => state.server.error;

export const selectSearchQuery = (state: RootState) => state.server.searchQuery;

export const selectSortBy = (state: RootState) => state.server.sortBy;

export const selectEnabledServers = (state: RootState) =>
  state.server.servers.filter(server => server.isEnabled);

export const selectServerByName = (name: string) => (state: RootState) =>
  state.server.servers.find(server => server.name === name);
