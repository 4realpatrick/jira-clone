"use client";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { useEditTaskModal } from "@/hooks/use-edit-task-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();
  const handleClose = () => {
    close();
    setTimeout(() => {
      window?.document.body.removeAttribute("style");
    }, 1000);
  };
  return (
    <ResponsiveModal
      open={!!taskId}
      onOpenChange={handleClose}
      onlyCancelToExit={false}
      showCloseButton={false}
    >
      {taskId && (
        <EditTaskFormWrapper handleCancel={handleClose} taskId={taskId} />
      )}
    </ResponsiveModal>
  );
};
