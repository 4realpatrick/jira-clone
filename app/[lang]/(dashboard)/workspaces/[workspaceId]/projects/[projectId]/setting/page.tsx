import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import { ProjectIdSettingClient } from "./client";

export default async function ProjectSettingPage({
  params,
}: {
  params: {
    lang: Locale;
  };
}) {
  const { lang } = await params;
  const user = await getCurrent();

  if (!user) {
    redirect({ href: "/sign-in", locale: lang });
  }

  return (
    <div className="pb-4">
      <ProjectIdSettingClient />
    </div>
  );
}
