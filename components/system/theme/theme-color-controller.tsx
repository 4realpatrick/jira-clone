"use client";
// Cmp
import { Button, ButtonProps } from "@/components/ui/button";
import { CgColorPicker } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCheck } from "react-icons/fa";
// Hooks
import { useEffect, useState } from "react";
import { useThemeColorStore } from "@/hooks/use-theme-color-store";
// Utils
import { cn } from "@/lib/utils";
// Constant
import {
  JIRA_THEME_COLOR_KEY,
  THEME_COLOR_ARRAY,
  TThemeColor,
} from "@/constant/theme";
import { useTranslations } from "next-intl";
const realColor = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  violet: "bg-violet-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  zinc: "bg-black",
};
// Types
interface IThemeControllerProps {
  variant?: ButtonProps["variant"];
  type?: "expand" | "dropdown";
}

export function ThemeColorController({
  variant = "default",
  type = "dropdown",
}: IThemeControllerProps) {
  const [mounted, setMounted] = useState(false);
  const themeColor = useThemeColorStore((state) => state.themeColor);
  const setThemeColor = useThemeColorStore((state) => state.setThemeColor);
  const t = useTranslations("common");
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(JIRA_THEME_COLOR_KEY, themeColor);
      document.documentElement.setAttribute("data-theme", themeColor);
    }
  }, [themeColor, mounted]);
  if (!mounted) return null;
  if (type === "expand") {
    return (
      <div className="flex gap-4 lg:gap-6 flex-wrap">
        {THEME_COLOR_ARRAY.map((color) => {
          return (
            <div
              className="px-2"
              onClick={() => setThemeColor(color)}
              key={color}
            >
              <div
                className={cn(
                  "size-20 rounded-full relative transition-opacity cursor-pointer",
                  color !== themeColor && "hover:opacity-70",
                  realColor[color]
                )}
              >
                {color === themeColor && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-primary/70">
                    <FaCheck className="text-background" />
                  </div>
                )}
              </div>

              <span className="text-center text-xs w-full inline-block">
                {t(`theme_colors.${color}`)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant}>
          <CgColorPicker />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuRadioGroup
          value={themeColor}
          onValueChange={(val: string) => setThemeColor(val as TThemeColor)}
        >
          {THEME_COLOR_ARRAY.map((color) => (
            <DropdownMenuRadioItem
              value={color}
              className="justify-between"
              key={color}
            >
              <span>{t(`theme_colors.${color}`)}</span>
              <div
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 rotate-90 justify-end`}
                style={{ background: color === "zinc" ? "black" : color }}
              ></div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
