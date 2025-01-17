"use client";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { EditWorkspaceForm } from "@/components/system/edit-workspace-form";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { PreferenceSetting } from "@/components/system/setting/preference";
import { DangerZone } from "@/components/system/setting/danger-zone";
import { InviteMember } from "@/components/system/setting/invite-member";
import { Locale } from "@/i18n/interface";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

export function WorkspaceSettingClient() {
  const lang = useLocale() as Locale;
  const workspaceId = useWorkspaceId();
  const t = useTranslations("nav");
  const { data: initialValues, isFetching } = useGetWorkspace({ workspaceId });
  const breadcrumbs: TBreadcrumbItem[] = useMemo(() => {
    return [
      {
        name: t("home"),
      },
      {
        name: initialValues ? (
          initialValues.name
        ) : (
          <Loader2 className="size-4 animate-spin" />
        ),
        href: `/workspaces/${workspaceId}`,
      },
      {
        name: t("setting"),
      },
    ];
  }, [t]);
  // TODO add loading state
  if (!initialValues || isFetching) return null;
  return (
    <>
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
    </>
  );
}
