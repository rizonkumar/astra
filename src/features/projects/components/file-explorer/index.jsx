import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useProject } from "../../hooks/use-projects";

export const FileExplorer = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const project = useProject(projectId);

  return (
    <div className="bg-sidebar h-full">
      <ScrollArea>
        <div
          className="group/project bg-accent flex h-5.5 w-full cursor-pointer items-center gap-0.5 text-left font-bold"
          role="button"
          onClick={() => setIsOpen((value) => !value)}
        >
          <ChevronRightIcon
            className={cn(
              "text-muted-foreground size-4 shrink-0",
              isOpen && "rotate-90",
            )}
          />
          <p className="line-clamp-1 text-xs uppercase">
            {project?.name ?? "Loading..."}
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};
