import { Messages } from "@/global";
import {
  Settings2,
  Workflow,
  MonitorCog,
  CalendarClock,
  TriangleAlert,
  Users,
  User,
  AlarmClockCheck,
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
    key: "member",
    icon: Users,
    url: "/workspaces/{workspaceId}/members",
  },
  {
    key: "tasks",
    icon: AlarmClockCheck,
    url: "/workspaces/{workspaceId}/tasks",
  },
  {
    key: "setting",
    icon: Settings2,
    url: "/workspaces/{workspaceId}/setting",
    items: [
      {
        key: "general",
        url: "/workspaces/{workspaceId}/setting/#general",
        icon: Workflow,
      },
      {
        key: "invite",
        url: "/workspaces/{workspaceId}/setting/#invite-member",
        icon: User,
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
