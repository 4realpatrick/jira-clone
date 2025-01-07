"use client";
import { Loader2, Pencil } from "lucide-react";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { ProjectAvatar } from "@/components/system/sidebar/projects/avatar";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { TransitionLink } from "@/components/common/link";
import { TaskTabSwitcher } from "@/components/system/task-view/task-view-switcher";
import { TextRevealButton } from "@/components/syntax/button/text-reveal";
import { useTranslations } from "next-intl";
import { useProjectId } from "@/hooks/use-project-id";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useMemo } from "react";
export function ProjectIdClient() {
  const projectId = useProjectId();
  const t = useTranslations();
  const { data, isFetching } = useGetProject({ projectId });

  const breadcrumbs: TBreadcrumbItem[] = useMemo(() => {
    return [
      {
        name: t("nav.home"),
      },
      {
        name: t("nav.projects"),
      },
      {
        name: data?.name || <Loader2 className="size-4 animate-spin" />,
      },
    ];
  }, [data]);

  return (
    <div className="pb-4 h-full flex flex-col">
      <InnerHeader breadcrumbs={breadcrumbs} />
      {isFetching || !data ? (
        <div className="size-8 border-4 border-t-primary border-muted rounded-full animate-spin"></div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <ProjectAvatar name={data.name} imageUrl={data.imageUrl} />
            <p className="text-lg font-semibold">{data.name}</p>
          </div>
          <div className="lg:sticky lg:right-2">
            <TransitionLink
              href={`/workspaces/${data.workspaceId}/projects/${projectId}/setting`}
            >
              <TextRevealButton icon={<Pencil className="size-4" />}>
                {t("common.edit")}
              </TextRevealButton>
            </TransitionLink>
          </div>
        </div>
      )}
      <DottedSeparator className="my-4" />
      <TaskTabSwitcher hideProjectFilter />
    </div>
  );
}
