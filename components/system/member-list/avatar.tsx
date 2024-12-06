import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const MemberAvatar = ({ name }: { name: string }) => {
  return (
    <Avatar className="transition border">
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
};
