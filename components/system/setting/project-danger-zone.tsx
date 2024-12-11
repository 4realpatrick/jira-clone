"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useRouter } from "@/i18n/routing";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { TProject } from "@/interface/project";

export const DangerZone = ({ project }: { project: TProject }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const { mutate: deleteProject, isPending } = useDeleteProject();
  const router = useRouter();

  const handleDeleteProject = () => {
    deleteProject(
      { param: { projectId: project.$id } },
      {
        onSuccess: () => {
          setOpen(false);
          router.push(`/workspaces/${project.workspaceId}`);
        },
      }
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          <Link href="#danger-zone" className="underline-link" id="danger-zone">
            {t("pages.projects.setting.danger_title")}
          </Link>
        </CardTitle>
        <CardDescription>
          {t("pages.projects.setting.danger_description")}
        </CardDescription>
        <DottedSeparator className="!mt-3" />
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          {t("pages.projects.setting.button")}
        </Button>
        <ResponsiveModal open={open} onOpenChange={setOpen} onlyCancelToExit>
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle>{t("pages.projects.setting.alert_title")}</CardTitle>
              <CardDescription>
                {t("pages.projects.setting.alert_description")}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                {t("common.cancel")}
              </Button>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={handleDeleteProject}
              >
                {t("common.continue")}
              </Button>
            </CardFooter>
          </Card>
        </ResponsiveModal>
      </CardContent>
    </Card>
  );
};
