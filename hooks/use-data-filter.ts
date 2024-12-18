import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ETaskStatus } from "@/interface/status";

interface IDataFilterState {
  search: string;
  statuses: ETaskStatus[];
  assigneeId?: string | null;
  dueDate?: string | null;
}

interface IDataFilterActions {
  setSearch: (search: string) => void;
  setStatuses: (statuses: ETaskStatus[]) => void;
  setAssigneeId: (assigneeId?: string) => void;
  setDueDate: (dueDate?: string) => void;
}

const defaultState: IDataFilterState = {
  search: "",
  statuses: [],
};

export const useDataFilter = create<IDataFilterState & IDataFilterActions>()(
  persist(
    immer((set) => ({
      ...defaultState,
      setSearch(search) {
        set((state) => {
          state.search = search;
        });
      },
      setStatuses(statuses) {
        set((state) => {
          state.statuses = statuses;
        });
      },
      setAssigneeId(assigneeId) {
        set((state) => {
          state.assigneeId = assigneeId;
        });
      },
      setDueDate(dueDate) {
        set((state) => {
          console.log("dueDate:", dueDate);
          state.dueDate = dueDate;
        });
      },
    })),
    { name: "jira-clone-data-filter" }
  )
);
