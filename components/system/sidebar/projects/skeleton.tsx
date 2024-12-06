import { SidebarMenuItem } from "@/components/ui/sidebar";

export const ProjectSkeleton = () => {
  return [...new Array(5)].map((_, index) => (
    <SidebarMenuItem key={index} className="flex items-center gap-2">
      <div className="size-8 bg-primary rounded-full animate-pulse"></div>
      <div className="w-32 bg-primary h-6 rounded-lg animate-pulse"></div>
    </SidebarMenuItem>
  ));
};
