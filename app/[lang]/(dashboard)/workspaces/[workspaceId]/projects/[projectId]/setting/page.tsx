import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import { getProjectById } from "@/features/projects/queries";
import { EditProjectForm } from "@/components/system/edit-project-form";
import { DangerZone } from "@/components/system/setting/project-danger-zone";

export default async function ProjectSettingPage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
    lang: Locale;
  };
}) {
  const { projectId, lang } = await params;

  const t = await getTranslations("nav");
  const user = await getCurrent();

  if (!user) {
    redirect({ href: "/sign-in", locale: lang });
  }

  const initialValues = await getProjectById({
    projectId,
  });

  if (!initialValues) {
    notFound();
    return null;
  }

  const breadcrumbs: TBreadcrumbItem[] = [
    {
      name: t("home"),
    },
    {
      name: t("projects"),
    },
    {
      name: initialValues.name,
      href: `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`,
    },
    {
      name: t("setting"),
    },
  ];
  return (
    <div className="pb-4">
      <InnerHeader breadcrumbs={breadcrumbs} />
      <div className="space-y-4 md:space-y-6">
        <EditProjectForm initialValues={initialValues} />
        <DangerZone project={initialValues} />
      </div>
    </div>
  );
}
