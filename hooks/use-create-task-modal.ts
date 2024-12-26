import { getCreateTaskSchema, TCreateTaskSchema } from "@/lib/schema";
import { useQueryState, parseAsBoolean, parseAsJson } from "nuqs";

export function useCreateTaskModal() {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [initialTask, setInitialTask] = useQueryState(
    "initial-task",
    parseAsJson(getCreateTaskSchema().partial().parse)
      .withDefault({})
      .withOptions({
        clearOnDefault: true,
      })
  );
  const openModal = (initialTask?: Partial<TCreateTaskSchema>) => {
    if (initialTask) {
      setInitialTask(initialTask);
    }
    setIsOpen(true);
  };
  const closeModal = () => {
    setInitialTask({});
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    initialTask,
    open: openModal,
    close: closeModal,
  };
}
