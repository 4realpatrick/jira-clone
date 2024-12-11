import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { TProject } from "@/interface/project";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TransitionLink } from "@/components/common/link";
import { ProjectAvatar } from "./avatar";

export const ProjectItem = ({ project }: { project: TProject }) => {
  const { isMobile } = useSidebar();
  const workspaceId = useWorkspaceId();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <TransitionLink
          href={`/workspaces/${workspaceId}/projects/${project.$id}`}
          className="!h-10"
        >
          <ProjectAvatar name={project.name} imageUrl={project.imageUrl} />
          <span>{project.name}</span>
        </TransitionLink>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover className="!top-2.5">
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuItem>
            <Folder className="text-muted-foreground" />
            <span>View Project</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Forward className="text-muted-foreground" />
            <span>Share Project</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 className="text-muted-foreground" />
            <span>Delete Project</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
