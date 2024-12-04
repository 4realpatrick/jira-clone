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
import { Link } from "@/i18n/routing";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { Button } from "@/components/ui/button";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";

export const DangerZone = ({ workspaceId }: { workspaceId: string }) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("pages.setting.danger");
  const ct = useTranslations("common");
  const { mutate: deleteWorkspace, isPending } = useDeleteWorkspace();
  const handleDeleteWorkspace = () => {
    deleteWorkspace(
      { param: { workspaceId } },
      {
        onSuccess: () => {
          setOpen(false);
          window.location.href = "/";
        },
      }
    );
  };
  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          <Link href="#danger-zone" className="underline-link" id="danger-zone">
            {t("title")}
          </Link>
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
        <DottedSeparator className="!mt-3" />
      </CardHeader>
      <CardContent className="space-y-8">
        <Button variant="destructive" onClick={() => setOpen(true)}>
          {t("button")}
        </Button>
        <ResponsiveModal open={open} onOpenChange={setOpen}>
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle>{t("alert_title")}</CardTitle>
              <CardDescription>{t("alert_description")}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                {ct("cancel")}
              </Button>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={handleDeleteWorkspace}
              >
                {ct("continue")}
              </Button>
            </CardFooter>
          </Card>
        </ResponsiveModal>
      </CardContent>
    </Card>
  );
};
