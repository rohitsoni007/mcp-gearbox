import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface HeadingProps {
  title: string;
  description?: string;
}

export function Heading({ title }: HeadingProps) {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate({ to: '/settings' });
  };

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {/* <p className="text-muted-foreground">{description}</p> */}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}