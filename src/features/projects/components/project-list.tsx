import { Spinner } from "@/components/ui/spinner";
import { usePartialProjects } from "../hooks/use-projects";
import { Kbd } from "@/components/ui/kbd";
import {
  AlertCircleIcon,
  CommandIcon,
  GlobeIcon,
  Loader2Icon,
} from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";

const formatTimeStamp = (timestamp: number) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return <FaGithub className="text-muted-foreground size-3.5" />;
  }
  if (project.importStatus === "failed") {
    return <AlertCircleIcon className="text-muted-foreground size-3.5" />;
  }

  if (project.importStatus === "importing") {
    return (
      <Loader2Icon className="text-muted-foreground size-3.5 animate-spin" />
    );
  }
  return <GlobeIcon className="text-muted-foreground size-3.5" />;
};
interface ProjectListProps {
  onViewAll: () => void;
}

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <Link
      href={`/projects/${data._id}`}
      className="text-foreground/60 hover:text-foreground group flex w-full items-center justify-between py-1 text-sm font-medium"
    >
      <div className="flex items-center gap-2">
        {getProjectIcon(data)}
        <span className="truncate">{data.name}</span>
      </div>
      <span className="text-muted-foreground group-hover:text-foreground/60 text-xs transition-colors">
        {formatTimeStamp(data.updatedAt ?? 0)}
      </span>
    </Link>
  );
};

export const ProjectList = ({ onViewAll }: ProjectListProps) => {
  const projects = usePartialProjects(6);

  if (projects === undefined) {
    return <Spinner className="text-ring size-4" />;
  }

  const [mostRecent, ...rest] = projects;

  return (
    <div className="flex flex-col gap-4">
      {projects.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-xs">
              Recent Projects
            </span>
            <button className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs transition-colors">
              <span>View All</span>
              <Kbd className="bg-accent border">
                <CommandIcon /> K
              </Kbd>
            </button>
          </div>
          <ul className="flex flex-col">
            {projects.map((project) => (
              <ProjectItem key={project._id} data={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
