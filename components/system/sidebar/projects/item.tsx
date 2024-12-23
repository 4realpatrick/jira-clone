import { Folder, MoreHorizontal, Share2, Pencil } from "lucide-react";
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
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const ProjectItem = ({ project }: { project: TProject }) => {
  const t = useTranslations("pages.projects.nav");
  const { isMobile } = useSidebar();
  const workspaceId = useWorkspaceId();
  const detailLink = `/workspaces/${workspaceId}/projects/${project.$id}`;

  const handleShare = () => {
    navigator.clipboard.writeText(detailLink);
    toast.success(t("copy_tip"));
  };
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <TransitionLink href={detailLink} className="!h-10">
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
          <DropdownMenuItem asChild>
            <TransitionLink href={detailLink}>
              <Folder className="text-muted-foreground" />
              <span>{t("view")}</span>
            </TransitionLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <TransitionLink href={`${detailLink}/setting`}>
              <Pencil className="text-muted-foreground" />
              <span>{t("edit")}</span>
            </TransitionLink>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="text-muted-foreground" />
            <span>{t("share")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
