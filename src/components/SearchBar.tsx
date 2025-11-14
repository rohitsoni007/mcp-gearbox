import { Search, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/serverSlice';
import {
  selectSearchQuery,
  selectIsProjectLevelSpecEnabled,
  selectProjectLocation,
} from '@/store/selectors/serverSelectors';
import {
  setProjectLevelSpecEnabled,
  setProjectLocation,
} from '@/store/slices/serverSlice';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FolderOpen } from 'lucide-react';
import { useActiveAgent } from '@/hooks/useActiveAgent';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);
  const isProjectLevelSpecEnabled = useAppSelector(
    selectIsProjectLevelSpecEnabled
  );
  const projectLocation = useAppSelector(selectProjectLocation);

  const activeAgent = useActiveAgent();

  const [localValue, setLocalValue] = useState(searchQuery);
  const [localProjectLocation, setLocalProjectLocation] =
    useState(projectLocation);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localValue));
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, dispatch]);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalProjectLocation(projectLocation);
  }, [projectLocation]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleProjectLevelSpecToggle = (checked: boolean) => {
    dispatch(setProjectLevelSpecEnabled(checked));
    // Clear project location when toggle is turned off
    if (!checked) {
      setLocalProjectLocation('');
      dispatch(setProjectLocation(''));
    }
  };

  const handleProjectLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalProjectLocation(e.target.value);
  };

  const handleProjectLocationBlur = () => {
    dispatch(setProjectLocation(localProjectLocation));
  };

  const handleSelectProjectLocation = async () => {
    try {
      console.log('Attempting to select project location...');
      console.log('window.mcpApi exists:', !!window.mcpApi);

      if (window.mcpApi) {
        console.log('Calling window.mcpApi.selectProjectLocation()');
        const result = await window.mcpApi.selectProjectLocation();
        console.log('Received result from selectProjectLocation:', result);

        if (result.success && result.path) {
          setLocalProjectLocation(result.path);
          dispatch(setProjectLocation(result.path));
        }
      } else {
        console.error('window.mcpApi is not available');
        alert('MCP API is not available');
      }
    } catch (error) {
      console.error('Error selecting project location:', error);
      alert(
        'Error selecting project location: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  };

  // Check if active agent is one of the specified agents
  const unsupportedAgent =
    activeAgent &&
    (activeAgent.agent === 'qoder' ||
      activeAgent.agent === 'copilot-cli' ||
      activeAgent.agent === 'lmstudio');

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search servers by name or author"
            value={localValue}
            onChange={handleSearchChange}
            className="glass-card h-10 w-full rounded-xl pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="project-level-spec">Project Level</Label>
          <Switch
            id="project-level-spec"
            checked={isProjectLevelSpecEnabled}
            onCheckedChange={handleProjectLevelSpecToggle}
          />
        </div>
        {isProjectLevelSpecEnabled && (
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Project location"
                value={localProjectLocation}
                onChange={handleProjectLocationChange}
                onBlur={handleProjectLocationBlur}
                className="h-10"
                readOnly
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSelectProjectLocation}
              className="cursor-pointer"
            >
              <FolderOpen className="h-4 w-4" />
            </Button>
          </div>
        )}
        {isProjectLevelSpecEnabled && unsupportedAgent && (
          <>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-yellow-500">
              {activeAgent?.name} not support project-level MCP
            </span>
          </>
        )}
      </div>
    </div>
  );
}
