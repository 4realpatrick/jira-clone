"use client";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();
  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={setIsOpen}
      onlyCancelToExit={false}
      showCloseButton={false}
    >
      <CreateTaskFormWrapper handleCancel={close} />
    </ResponsiveModal>
  );
};
