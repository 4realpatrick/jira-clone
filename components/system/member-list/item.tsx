import { Trash2, Ellipsis, ShieldCheck, User2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MemberAvatar } from "./avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { ERole } from "@/interface/role";
import { TMember } from "@/interface/member";

export const MemberItem = ({
  currentMember,
  member: { name, role, email, $id },
}: {
  member: TMember;
  currentMember: TMember;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("pages.members");
  const ct = useTranslations("common");
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();

  const isAdmin = role === ERole.ADMIN;
  const isCurrentUserAdmin = currentMember.role === ERole.ADMIN;
  const isPending = isUpdatingMember || isDeletingMember;

  const handleRoleChange = (newRole: ERole) => {
    updateMember({ json: { role: newRole }, param: { memberId: $id } });
  };
  const handleRemoveMember = () => {
    deleteMember(
      {
        param: {
          memberId: $id,
        },
      },
      {
        onSuccess() {
          if ($id === currentMember.$id) {
            window.location.reload();
          } else {
            setOpen(false);
          }
        },
      }
    );
  };

  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full sm:max-w-[300px] md:max-w-[600px] lg:max-w-[800px] overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3 justify-between">
        <div className="flex flex-row items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl">
            <MemberAvatar name={name} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre font-medium">
              <div className="flex items-center">
                {name}
                <span
                  className={cn("font-normal ml-1", isAdmin && "text-primary")}
                >
                  ({t(`role.${role}`)})
                </span>
              </div>
            </figcaption>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        {isCurrentUserAdmin && (
          <div className="flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  disabled={role === ERole.ADMIN || isPending}
                  onClick={() => handleRoleChange(ERole.ADMIN)}
                >
                  <ShieldCheck /> {t("action.admin")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={role === ERole.MEMBER || isPending}
                  onClick={() => handleRoleChange(ERole.MEMBER)}
                >
                  <User2 /> {t("action.member")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setOpen(true)}
                  disabled={isPending}
                >
                  <Trash2 /> {t("action.remove")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <ResponsiveModal open={open} onOpenChange={setOpen}>
        <Card className="shadow-none border-none">
          <CardHeader>
            <CardTitle>{t("action.remove_tip_title")}</CardTitle>
            <CardDescription>
              {t("action.remove_tip_description")}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isDeletingMember}
            >
              {ct("cancel")}
            </Button>
            <Button
              variant="destructive"
              disabled={isDeletingMember}
              onClick={handleRemoveMember}
            >
              {ct("continue")}
            </Button>
          </CardFooter>
        </Card>
      </ResponsiveModal>
    </figure>
  );
};
