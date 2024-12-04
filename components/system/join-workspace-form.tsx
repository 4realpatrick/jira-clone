"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { Link, useRouter } from "@/i18n/routing";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";

export const JoinWorkspaceForm = ({
  name,
  inviteCode,
  workspaceId,
}: {
  name: string;
  inviteCode: string;
  workspaceId: string;
}) => {
  const t = useTranslations();
  const router = useRouter();

  const { mutate: joinWorkspace, isPending } = useJoinWorkspace();

  const handleJoinWorkspace = () => {
    joinWorkspace(
      {
        json: { code: inviteCode },
        param: {
          workspaceId,
        },
      },
      {
        onSuccess({ data }) {
          router.replace(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  const handleCancel = () => {
    router.push("/");
  };
  return (
    <Card>
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">
          {t("pages.workspace.join.title")}
        </CardTitle>
        <CardDescription>
          {t.rich("pages.workspace.join.description", {
            strong: (chunck) => (
              <strong className="text-primary text-lg">{chunck}</strong>
            ),
            name,
          })}
        </CardDescription>
        <DottedSeparator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <Button
            variant="outline"
            className="w-full lg:w-fit"
            size="lg"
            disabled={isPending}
            onClick={handleCancel}
          >
            {t("common.refute")}
          </Button>
          <Button
            className="w-full lg:w-fit"
            size="lg"
            type="button"
            disabled={isPending}
            onClick={handleJoinWorkspace}
          >
            {t("common.confirm")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  ("http://localhost:3000/zh/workspaces/674f18ee00136ea09385/join/sGjJPU");
};
