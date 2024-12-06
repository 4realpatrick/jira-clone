import { AppSidebar } from "@/components/system/sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CreateWorkspaceModal } from "@/components/system/create-workspace-modal";
import { CreateProjectModal } from "@/components/system/create-project-modal";

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
      <SidebarInset className="px-4">{children}</SidebarInset>
    </>
  );
}
