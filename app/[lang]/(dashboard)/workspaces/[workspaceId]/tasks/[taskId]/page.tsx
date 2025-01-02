import { getTranslations } from "next-intl/server";
import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import { TaskClient } from "./client";

export default async function TasksPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const { lang } = await params;
  const user = await getCurrent();
  const t = await getTranslations();

  if (!user) {
    redirect({
      href: "/sign-in",
      locale: lang,
    });
    return;
  }

  return (
    <div className="pb-4 h-full flex flex-col">
      <TaskClient />
    </div>
  );
}
