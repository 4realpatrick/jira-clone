"use client";
import { JIRA_THEME_COLOR_KEY } from "@/constant/theme";
import { useEffect, useState } from "react";

export const ThemeColorProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      const theme = localStorage.getItem(JIRA_THEME_COLOR_KEY);
      document.documentElement.setAttribute("data-theme", theme || "blue");
    }
  }, [mounted]);
  return null;
};
