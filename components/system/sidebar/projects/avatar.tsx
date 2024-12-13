import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const ProjectAvatar = ({
  name,
  imageUrl,
  className = "",
}: {
  name: string;
  imageUrl?: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("transition border size-8", className)}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
};
