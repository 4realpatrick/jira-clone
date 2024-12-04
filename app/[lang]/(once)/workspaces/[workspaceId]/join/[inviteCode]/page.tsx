import { getLocale } from "next-intl/server";
import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import { getWorkspaceNameById } from "@/features/workspaces/queries";
import { JoinWorkspaceForm } from "@/components/system/join-workspace-form";

export default async function JoinPage({
  params,
}: {
  params: {
    inviteCode: string;
    workspaceId: string;
  };
}) {
  const currentUser = await getCurrent();
  const locale = (await getLocale()) as Locale;
  const stableParams = await params;
  if (!currentUser) {
    redirect({ href: "/sign-in", locale });
  }

  const { name } = await getWorkspaceNameById(stableParams.workspaceId);

  return <JoinWorkspaceForm name={name} {...stableParams} />;
}
