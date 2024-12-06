import { useQueryState, parseAsBoolean } from "nuqs";

export function useCreateProjectModal() {
  const [isOpen, setIsOpen] = useQueryState(
    "create-project",
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
