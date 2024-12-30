import { Presentation } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProjectAvatar } from "../../sidebar/projects/avatar";

interface IAssigneeFilterProps {
  onProjectChange: (assigneeId: string) => void;
  title: string;
  selectedProject?: {
    id: string;
    label: string;
    imageUrl?: string;
  };
  projects: {
    id: string;
    label: string;
    imageUrl?: string;
  }[];
  clearText: string;
}

export function ProjectFilter({
  title,
  selectedProject,
  projects,
  clearText,
  onProjectChange,
}: IAssigneeFilterProps) {
  return (
    <Select defaultValue={selectedProject?.id} onValueChange={onProjectChange}>
      <SelectTrigger
        className={cn(
          "w-full lg:w-auto h-8 border-dashed",
          buttonVariants({ variant: "outline", size: "sm" })
        )}
      >
        <div className="w-full flex items-center gap-x-2 text-xs font-normal">
          {selectedProject?.imageUrl ? (
            <ProjectAvatar
              className="size-6"
              name={selectedProject.label}
              imageUrl={selectedProject.imageUrl}
            />
          ) : (
            <Presentation className="size-4" />
          )}
          {selectedProject ? selectedProject.label : title}
        </div>
      </SelectTrigger>
      <SelectContent>
        {projects.map((i) => (
          <SelectItem value={i.id} key={i.id}>
            <div className="flex items-center gap-2">
              <ProjectAvatar
                className="size-6"
                name={i.label}
                imageUrl={i.imageUrl}
              />
              {i.label}
            </div>
          </SelectItem>
        ))}
        {selectedProject?.id && (
          <SelectItem value="all" className="flex items-center justify-center">
            {clearText}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
