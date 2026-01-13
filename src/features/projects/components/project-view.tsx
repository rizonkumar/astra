"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandIcon, SparkleIcon } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { FaGithub } from "react-icons/fa";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ProjectsView = () => {
  return (
    <div className="min-h-screen bg-sidebar flex flex-col items-center justify-center p-6 md:p-16">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-4 items-center">
        <div className="flex justify-between gap-4 w-full items-center">
          <div className="flex items-center gap-2 w-full group/logo">
            <img
              src="/logo.svg"
              alt="Astra"
              className="size-[32px] md:size-[46px]"
            />
            <h1
              className={cn(
                "text-4xl md:text-5xl font-semibold",
                font.className
              )}
            >
              Astra
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {}}
              className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
            >
              <div className="flex items-center justify-between w-full">
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
              className="h-full items-start justify-start p-4 bg-background border flex flex-col gap-6 rounded-none"
            >
              <div className="flex items-center justify-between w-full">
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
          <ProjectList />
        </div>
      </div>
    </div>
  );
};
