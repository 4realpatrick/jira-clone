"use client";
import { useCreateProjectModal } from "@/hooks/use-create-project-modal";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { CreateProjectForm } from "@/components/system/create-project-form";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm handleCancel={close} />
    </ResponsiveModal>
  );
};
