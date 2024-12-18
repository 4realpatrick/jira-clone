import { CircleUser } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MemberAvatar } from "../../member-list/avatar";

interface IAssigneeFilterProps {
  onAssigneeChange: (assigneeId: string) => void;
  title: string;
  selectedMember?: {
    value: string;
    label: string;
  };
  members: {
    value: string;
    label: string;
  }[];
  clearText: string;
}

export function AssigneeFilter({
  title,
  selectedMember,
  members,
  clearText,
  onAssigneeChange,
}: IAssigneeFilterProps) {
  return (
    <Select
      defaultValue={selectedMember?.value}
      onValueChange={onAssigneeChange}
    >
      <SelectTrigger
        className={cn(
          "w-full lg:w-auto h-8 border-dashed",
          buttonVariants({ variant: "outline", size: "sm" })
        )}
      >
        <div className="w-full flex items-center gap-x-2 text-xs font-normal">
          <CircleUser className="size-4" />
          {selectedMember ? selectedMember.label : title}
        </div>
      </SelectTrigger>
      <SelectContent>
        {members.map((i) => (
          <SelectItem value={i.value} key={i.value}>
            <div className="flex items-center gap-2">
              <MemberAvatar className="size-6" name={i.label} />
              {i.label}
            </div>
          </SelectItem>
        ))}
        {selectedMember?.value && (
          <SelectItem value="all" className="flex items-center justify-center">
            {clearText}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
