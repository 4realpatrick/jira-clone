import { Loader } from "lucide-react";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Card, CardContent } from "@/components/ui/card";
import { CreateTaskForm } from "./create-task-form";

interface ICreateTaskFormWrapper {
  handleCancel: () => void;
}

export function CreateTaskFormWrapper({
  handleCancel,
}: ICreateTaskFormWrapper) {
  const workspaceId = useWorkspaceId();

  const { data: projects, isFetching: isFetchingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isFetching: isFetchingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions =
    projects?.documents.map((project) => ({
      id: project.$id,
      name: project.name,
      imageUrl: project.imageUrl,
    })) || [];

  const memberOptions =
    members?.documents.map((project) => ({
      id: project.$id,
      name: project.name,
    })) || [];

  const isLoading = isFetchingProjects || isFetchingMembers;

  if (isLoading) {
    return (
      <Card className="w-full h-[50vh] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="animate-spin size-5 text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      projectOptions={projectOptions}
      memberOptions={memberOptions}
      handleCancel={handleCancel}
    />
  );
}
