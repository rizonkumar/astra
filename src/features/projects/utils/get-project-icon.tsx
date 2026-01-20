import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export const getProjectIcon = (project: Doc<"projects">, className?: string) => {
  const iconClassName = cn("text-muted-foreground", className);

  if (project.importStatus === "completed") {
    return <FaGithub className={iconClassName} />;
  }
  if (project.importStatus === "failed") {
    return <AlertCircleIcon className={iconClassName} />;
  }

  if (project.importStatus === "importing") {
    return (
      <Loader2Icon className={cn(iconClassName, "animate-spin")} />
    );
  }
  return <GlobeIcon className={iconClassName} />;
};
