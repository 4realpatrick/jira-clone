import { getTranslations } from "next-intl/server";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { TaskTabSwitcher } from "@/components/system/task-view/task-view-switcher";
import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";

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

  const breadcrumbs: TBreadcrumbItem[] = [
    {
      name: t("nav.tasks"),
    },
  ];
  return (
    <div className="pb-4 h-full flex flex-col">
      <InnerHeader breadcrumbs={breadcrumbs} />
      <DottedSeparator className="mb-4" />
      <TaskTabSwitcher />
    </div>
  );
}
