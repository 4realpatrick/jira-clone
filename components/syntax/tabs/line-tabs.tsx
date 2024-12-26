"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ITabItem<T> {
  key: string;
  value: T;
  label: string;
}

interface TabProps<T> extends ITabItem<T> {
  selected: boolean;
  setSelected: (tab: T) => void;
  customID?: string;
  fullWidth?: boolean;
}

const Tab = <T,>({
  label,
  value,
  selected,
  customID,
  fullWidth = false,
  setSelected,
}: TabProps<T>) => {
  return (
    <button
      onClick={() => setSelected(value)}
      className={cn(
        "relative rounded-md px-2 py-1 text-sm sm:text-base md:text-md font-medium text-muted-foreground transition-colors duration-300 focus-within:outline-primary/50 flex items-center gap-1",
        fullWidth && "flex-1",
        selected ? "text-primary" : " hover:text-primary"
      )}
    >
      <div className={cn("relative", fullWidth && "w-full")}>{label}</div>
      {selected && (
        <motion.div
          className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center"
          layoutId={customID + "linetab"}
          transition={{
            type: "spring",
            duration: 0.4,
            bounce: 0,
            delay: 0.1,
          }}
        >
          <span className="z-0 h-[3px] w-[60%] rounded-t-full bg-primary"></span>
        </motion.div>
      )}
    </button>
  );
};

interface LineTabProps<T> {
  tabs: ITabItem<T>[];
  selectedTab: T;
  customID?: string;
  fullWidth?: boolean;
  onTabChange: (tab: T) => void;
}

export const LineTabs = <T,>({
  tabs,
  selectedTab,
  fullWidth = false,
  customID = "",
  onTabChange,
}: LineTabProps<T>) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-b border-secondary dark:border-gray-600 flex-1",
        fullWidth && "justify-center"
      )}
    >
      {tabs.map((tab) => (
        <Tab
          {...tab}
          fullWidth={fullWidth}
          selected={selectedTab === tab.value}
          key={tab.value as string}
          customID={customID}
          setSelected={onTabChange}
        />
      ))}
    </div>
  );
};
