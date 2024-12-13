"use client";

import {
  EProjectTab,
  useSwitchProjectTab,
} from "@/hooks/use-switch-project-tab";
import { LineTabs } from "@/components/syntax/tabs/line-tabs";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TextRevealButton } from "@/components/syntax/button/text-reveal";
import { DottedSeparator } from "../common/dotted-separator";
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
  const { currentTab, setTab } = useSwitchProjectTab();
  const { open } = useCreateTaskModal();

  const translatedTaskViews = useMemo(
    () =>
      TaskViews.map((view) => ({
        ...view,
        label: t(`pages.projects.detail.${view.key}`),
      })),
    []
  );
  const handleSelect = (tab: EProjectTab) => {
    setTab(tab);
  };

  return (
    <div>
      <div className="flex items-center gap-x-4 flex-wrap gap-y-2">
        <LineTabs<EProjectTab>
          tabs={translatedTaskViews}
          selectedTab={currentTab}
          onSelect={handleSelect}
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
