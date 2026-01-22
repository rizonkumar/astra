import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  return (
    <nav className="flex justify-between items-center gap-x-2 p-2 bg-sidebar border-b border-border">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
        <BreadcrumbList className="gap-0!">
        <BreadcrumbItem>
          <BreadcrumbLink className="flex items-center gap-1.5" asChild>
            <Button variant="ghost" className="w-fit! p-1.5! h-7!" asChild>
              <Link href="/">
              <Image src="/logo.svg" alt="Astra" width={20} height={20} />
              <span className={cn("text-sm font-medium", font.className)}>Astra</span>
              </Link>
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="ml-0! mr-1" />
        <BreadcrumbItem>
        <BreadcrumbPage className="text-sm cursor-pointer hover:text-primary font-medium max-w-48 truncate">Demo Project</BreadcrumbPage>
        </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </nav>
  );
};