"use client";
import { useCreateWorkspaceModal } from "@/hooks/use-create-workspace-modal";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { CreateWorkspaceForm } from "@/components/system/create-workspace-form";

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm handleCancel={close} />
    </ResponsiveModal>
  );
};
