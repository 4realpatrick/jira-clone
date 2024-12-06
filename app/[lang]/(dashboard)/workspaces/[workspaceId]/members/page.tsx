import { getLocale, getTranslations } from "next-intl/server";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { getWorkspaceById } from "@/features/workspaces/queries";
import { redirect } from "@/i18n/routing";
import { Locale } from "@/i18n/interface";
import { MemberList } from "@/components/system/member-list";
import { getMember } from "@/features/members/queries";

export default async function MembersPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { workspaceId } = await params;
  const member = await getMember({ workspaceId });
  const lang = (await getLocale()) as Locale;
  const t = await getTranslations("nav");

  if (!member) {
    redirect({ href: "/sign-in", locale: lang });
    return null;
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
      name: t("member"),
    },
  ];

  return (
    <div className="pb-4">
      <InnerHeader breadcrumbs={breadcrumbs} />
      <div className="space-y-4 md:space-y-6">
        <MemberList currentMember={member} />
      </div>
    </div>
  );
}
