"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Plus } from "lucide-react";

import { LineTabs } from "@/components/syntax/tabs/line-tabs";
import { Button } from "@/components/ui/button";
import { TextRevealButton } from "@/components/syntax/button/text-reveal";
import { DottedSeparator } from "@/components/common/dotted-separator";
import {
  EProjectTab,
  useSwitchProjectTaskview,
} from "@/hooks/use-switch-project-task-view";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";

const TaskViews = [
  {
    key: "table",
    value: EProjectTab.TABLE,
    content: "table",
  },
  {
    key: "kanban",
    value: EProjectTab.KANBAN,
    content: "kanban",
  },
  {
    key: "calendar",
    value: EProjectTab.CALENDAR,
    content: "calendar",
  },
] as const;

export function TaskTabSwitcher() {
  const t = useTranslations();
  const isMobile = useIsMobile();
  const { taskView, setTaskView } = useSwitchProjectTaskview();
  const { open } = useCreateTaskModal();

  const translatedTaskViews = useMemo(
    () =>
      TaskViews.map((view) => ({
        ...view,
        label: t(`pages.projects.detail.${view.key}`),
      })),
    []
  );

  return (
    <div>
      <div className="flex items-center gap-x-4 flex-wrap gap-y-2">
        <LineTabs<EProjectTab>
          tabs={translatedTaskViews}
          selectedTab={taskView}
          onTabChange={setTaskView}
          fullWidth={isMobile}
        />
        {isMobile ? (
          <>
            <Button size="sm" className="h-7 w-full" onClick={open}>
              <Plus />
              {t("pages.projects.detail.new")}
            </Button>
            <DottedSeparator />
          </>
        ) : (
          <TextRevealButton icon={<Plus className="size-4" />} onClick={open}>
            {t("pages.projects.detail.new")}
          </TextRevealButton>
        )}
      </div>
      filter
      <DottedSeparator className="mt-2 md:mt-4" />
      content
    </div>
  );
}
