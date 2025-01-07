import { getLocale } from "next-intl/server";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "@/i18n/routing";
import { Locale } from "@/i18n/interface";
import { WorkspaceSettingClient } from "./client";

export default async function WorkspaceSettingPage({
  params,
}: {
  params: {
    workspaceId: string;
  };
}) {
  const user = await getCurrent();
  const lang = (await getLocale()) as Locale;

  if (!user) {
    redirect({ href: "/sign-in", locale: lang });
  }

  return (
    <div className="pb-4">
      <WorkspaceSettingClient />
    </div>
  );
}
