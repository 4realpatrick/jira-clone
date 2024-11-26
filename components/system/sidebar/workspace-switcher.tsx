"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Hint } from "@/components/common/hint";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspaces";

export function WorkspaceSwitcher() {
  const t = useTranslations("pages.workspace.sidebar.workspace_switcher");
  const { isMobile } = useSidebar();
  const { data } = useGetWorkspace();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeTeam.logo className="size-4" /> */}
                <ImageIcon className="size-full" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  placeholder
                  {/* {activeTeam.name} */}
                </span>
                <span className="truncate text-xs">
                  placeholder
                  {/* {activeTeam.plan} */}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {t("title")}
            </DropdownMenuLabel>
            {data?.documents.map((workspace) => (
              <DropdownMenuItem key={workspace.$id} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md relative">
                  {workspace.imageUrl ? (
                    <Image fill src={workspace.imageUrl} alt="Workspace" />
                  ) : (
                    <ImageIcon className="size-6 rounded-sm" />
                  )}
                </div>
                <Hint descrption={workspace.name}>
                  <p className="truncate max-w-28 text-sm">{workspace.name}</p>
                </Hint>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                {t("add")}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
