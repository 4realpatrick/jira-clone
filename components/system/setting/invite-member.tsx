"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hint } from "@/components/common/hint";
import { useResetInviteLink } from "@/features/workspaces/api/use-reset-invite-link";
import { Link, useRouter } from "@/i18n/routing";
import { Locale } from "@/i18n/interface";

export const InviteMember = ({
  workspaceId,
  locale,
  inviteCode,
}: {
  workspaceId: string;
  locale: Locale;
  inviteCode: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("pages.setting.invite_code");
  const ct = useTranslations("common");
  const router = useRouter();
  const { mutate: resetInviteLink, isPending } = useResetInviteLink();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => {
        toast.success(t("copy_success"));
      })
      .catch(() => {
        toast.error(t("copy_error"));
      });
  };
  const handleResetInviteLink = () => {
    resetInviteLink(
      { param: { workspaceId } },
      {
        onSuccess() {
          router.refresh();
        },
      }
    );
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fullInviteLink = `${window.location.origin}/${locale}/workspaces/${workspaceId}/join/${inviteCode}`;

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          <Link
            href="#invite-member"
            className="underline-link"
            id="invite-member"
          >
            {t("title")}
          </Link>
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
        <DottedSeparator className="!mt-3" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center gap-x-2">
          <Input value={fullInviteLink} disabled />
          <Hint asChild descrption={t("copy")} sideOffset={10}>
            <Button onClick={handleCopy} disabled={isPending}>
              <Copy />
            </Button>
          </Hint>
        </div>
        <DottedSeparator />
        <div className="flex items-center justify-end">
          <Hint asChild descrption={t("reset_tip")} sideOffset={10}>
            <Button onClick={handleResetInviteLink} disabled={isPending}>
              {t("reset")}
            </Button>
          </Hint>
        </div>
      </CardContent>
    </Card>
  );
};
