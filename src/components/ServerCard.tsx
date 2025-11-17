import GridServerCard from './GridServerCard';
import ListServerCard from './ListServerCard';
import { ServerData } from '@/types/mcp';

type ServerCardProps = {
  server: ServerData;
  view: 'grid' | 'list';
  index: number;
  addServerByAgent: (
    agent: string,
    serverName: string,
    projectLocation?: string
  ) => Promise<unknown>;
  removeServerByAgent: (
    serverName: string,
    agent: string,
    projectLocation?: string
  ) => Promise<unknown>;
};

export default function ServerCard({
  view,
  index,
  server,
  addServerByAgent,
  removeServerByAgent,
}: ServerCardProps) {
  if (view === 'list') {
    return (
      <ListServerCard
        index={index}
        server={server}
        addServerByAgent={addServerByAgent}
        removeServerByAgent={removeServerByAgent}
      />
    );
  }

  return (
    <GridServerCard
      index={index}
      server={server}
      addServerByAgent={addServerByAgent}
      removeServerByAgent={removeServerByAgent}
    />
  );
}
