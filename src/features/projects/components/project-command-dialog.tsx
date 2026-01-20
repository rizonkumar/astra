"use client";

import { useRouter } from "next/navigation";

import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

import { useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";
import { getProjectIcon } from "../utils/get-project-icon";

interface ProjectsCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectCommandDialog = ({ open, onOpenChange }: ProjectsCommandDialogProps) => {
  const router = useRouter();
  const projects = useProjects();

  const handleSelect = (projectId:string) => {
    router.push(`/projects/${projectId}`);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search Projects" description="Search and navigate to your projects">
      <CommandInput placeholder="Search projects..." />
      <CommandList>
        <CommandEmpty>No projects found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects?.map((project: Doc<"projects">) => (
            <CommandItem key={project._id} value={`${project.name}-${project._id}`} onSelect={() => handleSelect(project._id)}>
              {getProjectIcon(project, "size-4")}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>

    </CommandDialog>
  )
}