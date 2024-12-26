import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const MemberAvatar = ({
  name,
  className = "",
  fallbackClassName = "",
}: {
  name: string;
  className?: string;
  fallbackClassName?: string;
}) => {
  return (
    <Avatar className={cn("transition border", className)}>
      <AvatarFallback className={fallbackClassName}>{name[0]}</AvatarFallback>
    </Avatar>
  );
};
