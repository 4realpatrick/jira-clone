export type TThemeColor =
  | "blue"
  | "green"
  | "red"
  | "violet"
  | "yellow"
  | "orange"
  | "zinc";
export const THEME_COLOR_ARRAY: TThemeColor[] = [
  "blue",
  "green",
  "red",
  "violet",
  "yellow",
  "orange",
  "zinc",
];
export type TTheme = "system" | "light" | "dark";
export const THEME_ARRAY: TTheme[] = ["light", "dark", "system"];

export const JIRA_THEME_COLOR_KEY = "jira_theme_color_key";
export const JIRA_THEME_KEY = "jira_theme_key";
export function getThemeFromLocal(): TThemeColor {
  try {
    if (localStorage) {
      return (localStorage.getItem(JIRA_THEME_COLOR_KEY) ||
        "blue") as TThemeColor;
    }
    return "blue";
  } catch (error) {
    return "blue";
  }
}
