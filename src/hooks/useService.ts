import { executeCommand } from '@/services/mcpRendererService';
import React, { useEffect, useState } from 'react';

export default function useService(cb) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const getApi = async() => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await executeCommand(args);
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Command execution failed';
      setError(errorMessage);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, []);
  return (data, isLoading, error);
}
