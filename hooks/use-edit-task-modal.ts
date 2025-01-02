import { useQueryState, parseAsString } from "nuqs";

export function useEditTaskModal() {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);
  const openModal = (taskId: string) => setTaskId(taskId);
  const closeModal = () => setTaskId(null);

  return {
    taskId,
    setTaskId,
    open: openModal,
    close: closeModal,
  };
}
