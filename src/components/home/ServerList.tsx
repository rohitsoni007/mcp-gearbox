import { useState } from 'react';
import { cn } from '@/lib/utils';
import ServerCard from '../ServerCard';

interface Server {
  id: string;
  name: string;
  description: string;
  author: string;
  stars: string;
  status: 'online' | 'offline' | 'restarting';
  isEnabled: boolean;
}

const servers: Server[] = [
  {
    id: '1',
    name: 'Primary Dev Server',
    description: 'Main server for development and testing purposes.',
    author: 'Microsoft',
    stars: '4.8k',
    status: 'online',
    isEnabled: true,
  },
  {
    id: '2',
    name: 'Staging Environment',
    description: 'Pre-production environment for final checks.',
    author: 'Microsoft',
    stars: '3.2k',
    status: 'offline',
    isEnabled: false,
  },
  {
    id: '3',
    name: 'Analytics Cluster',
    description: 'Used for data processing and analytics tasks.',
    author: 'Microsoft',
    stars: '4.1k',
    status: 'online',
    isEnabled: true,
  },
  {
    id: '4',
    name: 'Legacy System Bridge',
    description: 'Connects to older, unsupported systems.',
    author: 'Microsoft',
    stars: '1.9k',
    status: 'restarting',
    isEnabled: true,
  },
];

interface ServerListProps {
  view: 'grid' | 'list';
}

export default function ServerList({ view }: ServerListProps) {
  const [serverList, setServerList] = useState(servers);

  const handleToggle = (id: string) => {
    setServerList(prev =>
      prev.map(server =>
        server.id === id ? { ...server, isEnabled: !server.isEnabled } : server
      )
    );
  };
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
      <div
        className={cn(
          'gap-4',
          view === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2' : 'flex flex-col'
        )}
      >
        {serverList.map((server, index) => (
          <ServerCard
            key={server.id}
            {...server}
            view={view}
            index={index}
            onToggle={() => handleToggle(server.id)}
          />
        ))}
      </div>
    </div>
  );
}
