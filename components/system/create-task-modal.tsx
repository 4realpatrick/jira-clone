"use client";
import { useCreateTaskModal } from "@/hooks/use-create-task-modal";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, close, open: openCreateTaskModal } = useCreateTaskModal();
  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          openCreateTaskModal();
        } else {
          close();
        }
      }}
      onlyCancelToExit={false}
      showCloseButton={false}
    >
      <CreateTaskFormWrapper handleCancel={close} />
    </ResponsiveModal>
  );
};
