import { useState } from 'react';
import { Server, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { ServerData } from '@/types/mcp';
import { useActiveAgent } from '@/hooks/useActiveAgent';
import { toggleServer } from '@/store/slices/serverSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatStars } from '@/utils/commonFunctions';
import { selectProjectLocation } from '@/store/selectors/serverSelectors';

type GridServerCardProps = {
  server: ServerData;
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

export default function GridServerCard({
  index,
  server,
  addServerByAgent,
  removeServerByAgent,
}: GridServerCardProps) {
  const { name, description, by, stargazer_count, isEnabled, avatar_url } =
    server;
  const [isToggling, setIsToggling] = useState(false);

  const activeAgent = useActiveAgent();
  const dispatch = useAppDispatch();
  const projectLocation = useAppSelector(selectProjectLocation);

  const onToggle = async () => {
    if (isToggling) return;

    setIsToggling(true);
    try {
      if (isEnabled) {
        await removeServerByAgent(
          name.toLowerCase(),
          activeAgent?.agent || '',
          projectLocation
        );
      } else {
        await addServerByAgent(
          activeAgent?.agent || '',
          name.toLowerCase(),
          projectLocation
        );
      }
      dispatch(toggleServer(name));
    } finally {
      setIsToggling(false);
    }
  };

  const status = isToggling
    ? isEnabled
      ? 'stopping'
      : 'starting'
    : isEnabled
      ? 'online'
      : 'offline';
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-primary/50 animate-fade-in"
      style={{ animationDelay }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            {avatar_url ? (
              <img
                src={avatar_url}
                alt={`${name} avatar`}
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : (
              <Server className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                'status-dot',
                status === 'online' && 'bg-status-online',
                status === 'offline' && 'bg-status-offline',
                (status === 'starting' || status === 'stopping') &&
                  'bg-status-restarting'
              )}
            />
            <span
              className={cn(
                'text-xs font-medium capitalize',
                status === 'online' && 'text-status-online',
                status === 'offline' && 'text-status-offline',
                (status === 'starting' || status === 'stopping') &&
                  'text-status-restarting'
              )}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>By {by}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{formatStars(stargazer_count)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={onToggle}
            disabled={isToggling}
          />
        </div>
      </div>
    </div>
  );
}
