import { getLocale, getTranslations } from "next-intl/server";
import { EditWorkspaceForm } from "@/components/system/edit-workspace-form";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { PreferenceSetting } from "@/components/system/setting/preference";
import { getCurrent } from "@/features/auth/action";
import { getWorkspaceById } from "@/features/workspaces/action";
import { redirect } from "@/i18n/routing";

export default async function WorkspaceSettingPage({
  params,
}: {
  params: {
    workspaceId: string;
  };
}) {
  const user = await getCurrent();
  const lang = await getLocale();
  const t = await getTranslations("url");
  const { workspaceId } = await params;
  if (!user) {
    redirect({ href: "/sign-in", locale: lang });
  }
  const initialValues = await getWorkspaceById({
    workspaceId,
  });

  if (!initialValues) {
    redirect({ href: `/workspaces/${params.workspaceId}`, locale: lang });
    return null;
  }

  const breadcrumbs: TBreadcrumbItem[] = [
    {
      name: t("workspace"),
    },
    {
      name: initialValues.name,
      href: `/workspaces/${workspaceId}`,
    },
    {
      name: t("setting"),
    },
  ];

  return (
    <div>
      <InnerHeader breadcrumbs={breadcrumbs} />
      <div className="space-y-4 md:space-y-6">
        <EditWorkspaceForm initialValues={initialValues} />
        <PreferenceSetting />
      </div>
    </div>
  );
}