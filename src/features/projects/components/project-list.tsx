import { Spinner } from "@/components/ui/spinner";
import { usePartialProjects } from "../hooks/use-projects";

interface ProjectListProps {
  onViewAll: () => void;
}

export const ProjectList = ({ onViewAll }: ProjectListProps) => {
  const projects = usePartialProjects(6);

  if (projects === undefined) {
    return <Spinner className="size-4 text-ring" />;
  }

  const [mostRecent, ...rest] = projects;

  return (
    <div className="flex flex-col gap-4">
      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              Recent Projects
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
