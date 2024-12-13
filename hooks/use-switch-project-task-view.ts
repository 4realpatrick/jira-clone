import { useQueryState, parseAsStringEnum } from "nuqs";

export enum EProjectTab {
  TABLE = "table",
  KANBAN = "kanban",
  CALENDAR = "calendar",
}

export function useSwitchProjectTaskview() {
  const [taskView, setTaskView] = useQueryState(
    "tab",
    parseAsStringEnum<EProjectTab>(Object.values(EProjectTab))
      .withDefault(EProjectTab.TABLE)
      .withOptions({ clearOnDefault: false })
  );

  return {
    taskView,
    setTaskView,
  };
}
