"use client";
import { Check, ListCheck } from "lucide-react";
import { Key, ReactNode, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
// Cmp
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
// Utils
import { cn } from "@/lib/utils";

// Types
interface IMultiSelectFilterProps<T> {
  title: string;
  options: {
    label: string;
    value: T;
    icon?: ReactNode;
  }[];
  defaultValue: T[];
  allowSearch?: boolean;
  onlyChangeOnOpenChange?: boolean;
  onSelectChange: (values: T[]) => void;
}

export const MultiSelectFilter = <T,>({
  title,
  options,
  defaultValue,
  allowSearch = false,
  onlyChangeOnOpenChange = false,
  onSelectChange,
}: IMultiSelectFilterProps<T>) => {
  const [selectedState, setSelectedState] = useState<T[]>([]);
  const t = useTranslations();

  const handleAdd = (value: T) => {
    onlyChangeOnOpenChange
      ? setSelectedState([...selectedState, value])
      : onSelectChange([...defaultValue, value]);
  };
  const handleDelete = (value: T) => {
    onlyChangeOnOpenChange
      ? setSelectedState(selectedState.filter((v) => v !== value))
      : onSelectChange(defaultValue.filter((v) => v !== value));
  };
  const handleClear = () => {
    onlyChangeOnOpenChange ? setSelectedState([]) : onSelectChange([]);
  };
  const handleOpenChange = (open: boolean) => {
    if (!open && onlyChangeOnOpenChange) {
      onSelectChange(selectedState);
    }
  };
  useEffect(() => {
    onlyChangeOnOpenChange && setSelectedState(defaultValue);
  }, [onlyChangeOnOpenChange, defaultValue]);

  const state = onlyChangeOnOpenChange ? selectedState : defaultValue;

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full lg:w-auto h-8 border-dashed flex items-center justify-between lg:justify-center"
        >
          <div className="flex items-center gap-x-2 text-xs font-normal w-full">
            <ListCheck className="size-4" />
            {title}
          </div>

          {state.length > 0 && (
            <>
              <div
                className="shrink-0 bg-border w-[1px] mx-2 h-4 hidden lg:block"
                data-orientation="vertical"
              />
              {/* <Badge className="rounded-sm font-normal lg:hidden">
                {state.length}
              </Badge> */}
              <div className="space-x-1 flex">
                {state.length > 3 ? (
                  <Badge className="rounded-sm px-1 font-normal">
                    {t(`components.multi_select.selected`, {
                      num: state.length,
                    })}
                  </Badge>
                ) : (
                  options
                    .filter((i) => state.includes(i.value))
                    .map((option) => (
                      <Badge
                        key={option.value as Key}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[50vw] max-w-full lg:w-[200px] p-0"
        align="start"
      >
        <Command>
          {allowSearch && <CommandInput placeholder="请选择" />}
          <CommandList className="relative">
            <CommandEmpty>{t("common.empty")}</CommandEmpty>
            <CommandGroup>
              {options.map(({ label, value, icon }) => {
                const isSelected = state.includes(value);
                return (
                  <CommandItem
                    key={value as Key}
                    onSelect={() => {
                      isSelected ? handleDelete(value) : handleAdd(value);
                    }}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("size-4")} />
                    </div>
                    <span className="inline-flex items-center gap-x-2">
                      {icon}
                      {label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {state.length > 0 && (
              <div className="sticky bottom-0 w-full bg-background">
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="justify-center text-center rounded-sm"
                  >
                    {t("common.clear")}
                  </CommandItem>
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
