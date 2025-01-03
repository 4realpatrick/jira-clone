import { getLocale, getTranslations } from "next-intl/server";
import { EditWorkspaceForm } from "@/components/system/edit-workspace-form";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { PreferenceSetting } from "@/components/system/setting/preference";
import { DangerZone } from "@/components/system/setting/danger-zone";
import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceById } from "@/features/workspaces/queries";
import { redirect } from "@/i18n/routing";
import { InviteMember } from "@/components/system/setting/invite-member";
import { Locale } from "@/i18n/interface";

export default async function WorkspaceSettingPage({
  params,
}: {
  params: {
    workspaceId: string;
  };
}) {
  const user = await getCurrent();
  const lang = (await getLocale()) as Locale;
  const t = await getTranslations("nav");
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
      name: t("home"),
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
    <div className="pb-4">
      <InnerHeader breadcrumbs={breadcrumbs} />
      <div className="space-y-4 md:space-y-6">
        <EditWorkspaceForm initialValues={initialValues} />
        <InviteMember
          workspaceId={workspaceId}
          locale={lang}
          inviteCode={initialValues.inviteCode}
        />
        <PreferenceSetting />
        <DangerZone workspaceId={workspaceId} />
      </div>
    </div>
  );
}
