import { McpStatus } from "@/components/McpStatus";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const Settings = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleBackClick}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          </div>
          <p className="text-muted-foreground ml-12">Manage your MCP configuration and system settings</p>
        </div>
      </div>

      <McpStatus />
    </div>
  );
};

export default Settings;