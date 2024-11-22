import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { getThemeFromLocal, TThemeColor } from "@/constant/theme";

export interface IThemeColorState {
  themeColor: TThemeColor;
}

export interface IThemeColorAction {
  setThemeColor: (themeColor: TThemeColor) => void;
}

export const useThemeColorStore = create<
  IThemeColorState & IThemeColorAction
>()(
  persist(
    immer((set) => ({
      themeColor: getThemeFromLocal(),
      setThemeColor(themeColor) {
        set({ themeColor });
      },
    })),
    {
      name: "theme-color-state",
    }
  )
);
