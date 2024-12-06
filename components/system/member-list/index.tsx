"use client";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { AnimatedList } from "@/components/ui/animated-list";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { ERole } from "@/interface/role";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { MemberItem } from "./item";
import { MembersSkeleton } from "./skeleton";
import { TMember } from "@/interface/member";

export const MemberList = ({ currentMember }: { currentMember: TMember }) => {
  const workspaceId = useWorkspaceId();
  const t = useTranslations("pages.members");
  const isAdmin = currentMember.role === ERole.ADMIN;

  const { data, isFetching } = useGetMembers({
    workspaceId,
  });

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>
          {t(isAdmin ? "admin_description" : "member_description")}
        </CardDescription>
        <DottedSeparator />
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <MembersSkeleton />
        ) : (
          <AnimatedList delay={500}>
            {data?.documents.map((member) => (
              <MemberItem
                member={member}
                key={member.$id}
                currentMember={currentMember}
              />
            ))}
          </AnimatedList>
        )}
        {/* <MembersSkeleton /> */}
      </CardContent>
    </Card>
  );
};
