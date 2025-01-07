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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Hint } from "@/components/common/hint";
import { RippleWaveLoader } from "@/components/syntax/loader/ripple-wave";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useRouter } from "@/i18n/routing";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/hooks/use-create-workspace-modal";

export function WorkspaceSwitcher() {
  const t = useTranslations("pages.workspace.sidebar.workspace_switcher");
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { isMobile, open: isSidebarOpen } = useSidebar();

  const { data, isFetching } = useGetWorkspaces();
  const { open } = useCreateWorkspaceModal();

  const handleWorkspaceChange = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
  };

  const currentWorkspace = React.useMemo(() => {
    if (isFetching || !data) return null;
    return data.documents.find((i) => i.$id === workspaceId)!;
  }, [data, workspaceId]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {isFetching ? (
            <div className="mt-3">
              <RippleWaveLoader waveCount={isSidebarOpen ? 7 : 3} />
            </div>
          ) : (
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {currentWorkspace ? (
                  <>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground relative">
                      {currentWorkspace?.imageUrl ? (
                        <Image
                          fill
                          src={currentWorkspace.imageUrl}
                          alt="Workspace Icon"
                        />
                      ) : (
                        <ImageIcon className="size-full rounded-sm text-primary" />
                      )}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {currentWorkspace.name}
                      </span>
                      <Hint descrption={currentWorkspace.description} asChild>
                        <span className="truncate text-xs">
                          {currentWorkspace.description}
                        </span>
                      </Hint>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </>
                ) : (
                  <div className="flex items-center w-full">
                    <p>{t("none_select")}</p>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </div>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          )}

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {t("title")}
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={workspaceId}
              onValueChange={handleWorkspaceChange}
            >
              {data?.documents.map((workspace) => (
                <DropdownMenuRadioItem
                  key={workspace.$id}
                  className="gap-2 p-2"
                  value={workspace.$id}
                  useCheckIcon
                >
                  <div className="flex size-6 items-center justify-center rounded-md relative">
                    {workspace.imageUrl ? (
                      <Image fill src={workspace.imageUrl} alt="Workspace" />
                    ) : (
                      <ImageIcon className="size-6 rounded-sm" />
                    )}
                  </div>
                  <Hint descrption={workspace.name}>
                    <p className="truncate max-w-28 text-sm">
                      {workspace.name}
                    </p>
                  </Hint>
                </DropdownMenuRadioItem>
              ))}
              {!data?.documents.length && (
                <DropdownMenuItem className="text-xs">
                  {t("empty")}
                </DropdownMenuItem>
              )}
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={open}>
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
