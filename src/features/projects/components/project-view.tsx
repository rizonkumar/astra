"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandIcon, SparkleIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { FaGithub } from "react-icons/fa";
import { ProjectList } from "./project-list";
import { useCreateProject } from "../hooks/use-projects";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ProjectsView = () => {
  const createProject = useCreateProject();

  return (
    <div className="bg-sidebar flex min-h-screen flex-col items-center justify-center p-6 md:p-16">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="group/logo flex w-full items-center gap-2">
            <img
              src="/logo.svg"
              alt="Astra"
              className="size-[32px] md:size-[46px]"
            />
            <h1
              className={cn(
                "text-4xl font-semibold md:text-5xl",
                font.className,
              )}
            >
              Astra
            </h1>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                const projectName = uniqueNamesGenerator({
                  dictionaries: [adjectives, colors, animals],
                  separator: "-",
                  length: 3,
                });
                createProject({
                  name: projectName,
                });
              }}
              className="bg-background flex h-full flex-col items-start justify-start gap-6 rounded-none border p-4"
            >
              <div className="flex w-full items-center justify-between">
                <SparkleIcon className="size-4" />
                <Kbd className="bg-accent border">
                  <CommandIcon className="size-3" /> J
                </Kbd>
              </div>
              <div>
                <span className="text-sm">New</span>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => {}}
              className="bg-background flex h-full flex-col items-start justify-start gap-6 rounded-none border p-4"
            >
              <div className="flex w-full items-center justify-between">
                <FaGithub className="size-4" />
                <Kbd className="bg-accent border">
                  <CommandIcon className="size-3" /> I
                </Kbd>
              </div>
              <div>
                <span className="text-sm">Import</span>
              </div>
            </Button>
          </div>
          <ProjectList onViewAll={() => {}} />
        </div>
      </div>
    </div>
  );
};
