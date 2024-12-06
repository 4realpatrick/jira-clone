"use client";

import { Plus, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AnimatedList } from "@/components/ui/animated-list";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { usePathname } from "@/i18n/routing";
import { ProjectItem } from "./item";
import { ProjectSkeleton } from "./skeleton";
import { useTranslations } from "next-intl";
import { useCreateProjectModal } from "@/hooks/use-create-project-modal";

export function NavProjects() {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const { data, isFetching } = useGetProjects({ workspaceId });
  const { open } = useCreateProjectModal();
  // TODO add isActive attribute
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("projects")}</SidebarGroupLabel>
      <SidebarMenu>
        {isFetching ? (
          <ProjectSkeleton />
        ) : (
          <AnimatedList delay={500} className="!gap-2">
            {data?.documents.map((item) => (
              <ProjectItem project={item} key={item.name} />
            ))}
          </AnimatedList>
        )}
        <SidebarMenuItem>
          <SidebarMenuButton
            className="text-sidebar-foreground/70"
            onClick={open}
          >
            <Plus className="text-sidebar-foreground/70" />
            <span>{t("new_project")}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
