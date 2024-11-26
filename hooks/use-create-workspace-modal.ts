import { useQueryState, parseAsBoolean } from "nuqs";

export function useCreateWorkspaceModal() {
  const [isOpen, setIsOpen] = useQueryState(
    "create-workspace",
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
