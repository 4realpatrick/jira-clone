"use client";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { EditProjectForm } from "@/components/system/edit-project-form";
import { DangerZone } from "@/components/system/setting/project-danger-zone";
import { useProjectId } from "@/hooks/use-project-id";
import { useTranslations } from "next-intl";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useMemo } from "react";

export function ProjectIdSettingClient() {
  const projectId = useProjectId();

  const t = useTranslations("nav");

  const { data } = useGetProject({ projectId });
  const breadcrumbs: TBreadcrumbItem[] = useMemo(() => {
    return data
      ? [
          {
            name: t("home"),
          },
          {
            name: t("projects"),
          },
          {
            name: data.name,
            href: `/workspaces/${data.workspaceId}/projects/${data.$id}`,
          },
          {
            name: t("setting"),
          },
        ]
      : [];
  }, [data, t]);

  // TODO add loading state
  if (!data) return null;

  return (
    <>
      <InnerHeader breadcrumbs={breadcrumbs} />
      <div className="space-y-4 md:space-y-6">
        <EditProjectForm initialValues={data} />
        <DangerZone project={data} />
      </div>
    </>
  );
}
