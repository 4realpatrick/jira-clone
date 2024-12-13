import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const MemberAvatar = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("transition border", className)}>
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
};
