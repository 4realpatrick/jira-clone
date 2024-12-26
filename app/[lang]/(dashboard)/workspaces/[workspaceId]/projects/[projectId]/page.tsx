import { getTranslations } from "next-intl/server";
import { Pencil } from "lucide-react";
import { notFound } from "next/navigation";
import { InnerHeader, TBreadcrumbItem } from "@/components/system/inner-header";
import { ProjectAvatar } from "@/components/system/sidebar/projects/avatar";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { TransitionLink } from "@/components/common/link";
import { TaskTabSwitcher } from "@/components/system/task-view/task-view-switcher";
import { getCurrent } from "@/features/auth/queries";
import { getProjectById } from "@/features/projects/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import { TextRevealButton } from "@/components/syntax/button/text-reveal";
import { useIsMobile } from "@/hooks/use-mobile";

export default async function ProjectPage({
  params,
}: {
  params: {
    workspaceId: string;
    projectId: string;
    lang: Locale;
  };
}) {
  const { projectId, lang } = await params;
  const t = await getTranslations();
  const user = await getCurrent();

  if (!user) {
    redirect({ href: "/sign-in", locale: lang });
  }

  const initialValues = await getProjectById({
    projectId,
  });

  if (!initialValues) {
    notFound();
    return null;
  }

  const breadcrumbs: TBreadcrumbItem[] = [
    {
      name: t("nav.home"),
    },
    {
      name: t("nav.projects"),
    },
    {
      name: initialValues.name,
    },
  ];
  return (
    <div className="pb-4 h-full flex flex-col">
      <InnerHeader breadcrumbs={breadcrumbs} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            imageUrl={initialValues.imageUrl}
          />
          <p>{initialValues.name}</p>
        </div>
        <div>
          <TransitionLink
            href={`/workspaces/${initialValues.workspaceId}/projects/${projectId}/setting`}
          >
            <TextRevealButton icon={<Pencil className="size-4" />}>
              {t("common.edit")}
            </TextRevealButton>
          </TransitionLink>
        </div>
      </div>
      <DottedSeparator className="my-4" />
      <TaskTabSwitcher />
    </div>
  );
}
