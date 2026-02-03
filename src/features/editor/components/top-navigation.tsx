import { ScrollArea } from "@/components/ui/scroll-area";
import { Id } from "../../../../convex/_generated/dataModel";

export const TopNavigation = ({ projectId }: { projectId: Id<"projects"> }) => {
  return (
    <ScrollArea className="flex-1">
      <nav className="bg-sidebar flex h-8.75 items-center border-b"></nav>
    </ScrollArea>
  );
};
