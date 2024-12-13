import { useQueryState, parseAsBoolean } from "nuqs";

export function useCreateTaskModal() {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    open: openModal,
    close: closeModal,
  };
}
