import { Messages } from "@/global";
import {
  Settings2,
  Workflow,
  MonitorCog,
  CalendarClock,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

export type TNavItem = {
  key: keyof Messages["nav"];
  url?: string;
  icon?: LucideIcon;
  items?: (Omit<TNavItem, "url" | "items"> & Required<Pick<TNavItem, "url">>)[];
};

export const NAV_DATA: TNavItem[] = [
  {
    key: "home",
    icon: CalendarClock,
    url: "/workspaces/{workspaceId}/",
  },
  {
    key: "setting",
    icon: Settings2,
    items: [
      {
        key: "general",
        url: "/workspaces/{workspaceId}/setting/#general",
        icon: Workflow,
      },
      {
        key: "preference",
        url: "/workspaces/{workspaceId}/setting/#preference",
        icon: MonitorCog,
      },
      {
        key: "danger",
        url: "/workspaces/{workspaceId}/setting/#danger-zone",
        icon: TriangleAlert,
      },
    ],
  },
] as const;
