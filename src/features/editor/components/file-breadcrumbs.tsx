import { Id } from "../../../../convex/_generated/dataModel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEditor } from "../hooks/use-editor";
import { useFilePath } from "@/features/projects/hooks/use-files";
import React from "react";
import { FileIcon } from "@react-symbols/icons/utils";

export const FileBreadcrumbs = ({
  projectId,
}: {
  projectId: Id<"projects">;
}) => {
  const { activeTabId } = useEditor(projectId);
  const filePath = useFilePath(activeTabId);

  if (filePath === undefined || !activeTabId) {
    return (
      <div className="bg-background border-b p-2 pl-4">
        <Breadcrumb>
          <BreadcrumbList className="gap-0.5 sm:gap-0.5">
            <BreadcrumbItem className="text-sm">
              <BreadcrumbPage>&nbsp;</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }
  return (
    <div className="bg-background border-b p-2 pl-4">
      <Breadcrumb>
        <BreadcrumbList className="gap-0.5">
          {filePath.map((file, index) => {
            const isLast = index === filePath.length - 1;
            return (
              <React.Fragment key={file._id}>
                <BreadcrumbItem className="text-sm">
                  {isLast ? (
                    <BreadcrumbPage className="flex items-center gap-1">
                      <FileIcon
                        fileName={file.name}
                        autoAssign
                        className="size-4"
                      />
                      {file.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href="#">{file.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
