"use client";

import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";

import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

import { useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";

interface ProjectsCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return <FaGithub className="text-muted-foreground size-4" />;
  }
  if (project.importStatus === "failed") {
    return <AlertCircleIcon className="text-muted-foreground size-4" />;
  }

  if (project.importStatus === "importing") {
    return (
      <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
    );
  }
  return <GlobeIcon className="text-muted-foreground size-4" />;
};

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
              {getProjectIcon(project)}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>

    </CommandDialog>
  )
}