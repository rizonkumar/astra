import { useState } from "react";
import { Id, Doc } from "../../../../../convex/_generated/dataModel";

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

  return (
    <div>
      <div>{item.name}</div>
    </div>
  );
};
