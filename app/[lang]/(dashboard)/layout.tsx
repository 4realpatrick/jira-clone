import { AppSidebar } from "@/components/system/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { CreateWorkspaceModal } from "@/components/system/create-workspace-modal";
import { CreateProjectModal } from "@/components/system/create-project-modal";
import { CreateTaskModal } from "@/components/system/create-task-modal";
import { EditTaskModal } from "@/components/system/edit-task-modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />
      <SidebarInset className="px-4">{children}</SidebarInset>
    </>
  );
}
