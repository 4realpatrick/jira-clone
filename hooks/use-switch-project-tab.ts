import { useQueryState, parseAsStringEnum } from "nuqs";

export enum EProjectTab {
  TABLE = "table",
  KANBAN = "kanban",
  CALENDAR = "calendar",
}

export function useSwitchProjectTab() {
  const [currentTab, setTab] = useQueryState(
    "tab",
    parseAsStringEnum<EProjectTab>(Object.values(EProjectTab))
      .withDefault(EProjectTab.TABLE)
      .withOptions({ clearOnDefault: false })
  );

  return {
    currentTab,
    setTab,
  };
}
