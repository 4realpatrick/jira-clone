import { getCurrent } from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;

  const currentUser = await getCurrent();

  if (!currentUser) {
    redirect({ href: "/sign-in", locale: lang });
  }

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    redirect({ href: "/workspaces/create", locale: lang });
  } else {
    redirect({
      href: `/workspaces/${workspaces.documents[0].$id}`,
      locale: lang,
    });
  }

  return null;
}
