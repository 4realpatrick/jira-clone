import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProjectAvatar = ({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string;
}) => {
  return (
    <Avatar className="transition border size-8">
      <AvatarImage src={imageUrl} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
};
