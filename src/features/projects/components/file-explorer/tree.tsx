import { useState } from "react";
import { Id, Doc } from "../../../../../convex/_generated/dataModel";
import {
  useCreateFile,
  useCreateFolder,
  useDeleteFile,
  useFolderContents,
  useRenameFile,
} from "../../hooks/use-files";
import { TreeItemWrapper } from "./tree-item-wrapper";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingRow } from "./loading-row";

export const Tree = ({
  item,
  level = 0,
  projectId,
}: {
  item: Doc<"files">;
  level?: number;
  projectId: Id<"projects">;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [creating, setCreating] = useState<"file" | "folder" | null>(null);

  const renameFile = useRenameFile();
  const deleteFile = useDeleteFile();
  const createFile = useCreateFile();
  const createFolder = useCreateFolder();
  const folderContents = useFolderContents({
    projectId,
    parentId: item._id,
    enabled: item.type === "folder" && isOpen,
  });

  const startCreating = (type: "file" | "folder") => {
    setIsOpen(true);
    setCreating(type);
  };

  if (item.type === "file") {
    const fileName = item.name;
    return (
      <TreeItemWrapper
        item={item}
        level={level}
        isActive={false}
        onClick={() => {}}
        onDoubleClick={() => {}}
        onRename={() => setIsRenaming(true)}
        onDelete={() => deleteFile({ id: item._id })}
        onCreateFile={() => setCreating("file")}
        onCreateFolder={() => setCreating("folder")}
      >
        <FileIcon fileName={fileName} autoAssign className="size-4" />
        <span className="truncate text-sm">{fileName}</span>
      </TreeItemWrapper>
    );
  }
  const folderName = item.name;
  const folderContent = (
    <>
      <div className="flex items-center gap-0.5">
        <ChevronRightIcon
          className={cn(
            "text-muted-foreground size-4 shrink-0",
            isOpen && "rotate-90",
          )}
        />
        <FolderIcon folderName={folderName} className="size-4" />
      </div>
      <span className="truncate text-sm">{folderName}</span>
    </>
  );

  return (
    <>
      <TreeItemWrapper
        item={item}
        level={level}
        onClick={() => {}}
        onDoubleClick={() => {}}
        onRename={() => setIsRenaming(true)}
        onDelete={() => deleteFile({ id: item._id })}
        onCreateFile={() => startCreating("file")}
        onCreateFolder={() => startCreating("folder")}
      >
        {folderContent}
      </TreeItemWrapper>

      {isOpen && (
        <>
          {folderContents === undefined && <LoadingRow level={level + 1} />}

          {folderContents?.map((subItem) => (
            <Tree
              key={subItem._id}
              item={subItem}
              level={level + 1}
              projectId={projectId}
            />
          ))}
        </>
      )}
    </>
  );
};
