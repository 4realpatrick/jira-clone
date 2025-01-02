import { Loader } from "lucide-react";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Card, CardContent } from "@/components/ui/card";
import { EditTaskForm } from "./edit-task-form";
import { useGetTask } from "@/features/tasks/api/use-get-task";

interface IEditTaskFormWrapperProps {
  taskId: string;
  handleCancel: () => void;
}

export function EditTaskFormWrapper({
  taskId,
  handleCancel,
}: IEditTaskFormWrapperProps) {
  const workspaceId = useWorkspaceId();

  const { data: task, isFetching: isFetchingTask } = useGetTask({ taskId });

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

  const isLoading = isFetchingProjects || isFetchingMembers || isFetchingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[50vh] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="animate-spin size-5 text-primary" />
        </CardContent>
      </Card>
    );
  }
  if (!task) {
    return null;
  }
  return (
    <EditTaskForm
      initialValues={task}
      projectOptions={projectOptions}
      memberOptions={memberOptions}
      handleCancel={handleCancel}
    />
  );
}
