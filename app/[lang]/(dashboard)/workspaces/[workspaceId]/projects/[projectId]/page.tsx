import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import { ProjectIdClient } from "./client";

export default async function ProjectPage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
    lang: Locale;
  };
}) {
  const { lang } = await params;
  const user = await getCurrent();

  if (!user) {
    redirect({ href: "/sign-in", locale: lang });
  }

  return <ProjectIdClient />;
}
