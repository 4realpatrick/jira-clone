import { Table } from "@tanstack/react-table";
import { ChevronDownIcon, GanttChart } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface IDataTableViewSwitcherProps<TData> {
  table: Table<TData>;
}

const columns = [
  "task",
  "description",
  "status",
  "dueDate",
  "assignee",
  "tags",
] as const;

export function DataTableViewSwitcher<TData>({
  table,
}: IDataTableViewSwitcherProps<TData>) {
  const t = useTranslations("pages.tasks.table");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto border-dashed text-xs font-normal"
          size="sm"
        >
          <GanttChart className="size-4" />
          {t("view")} <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("view_switcher_label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {t(`columns.${column.id as (typeof columns)[number]}`)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
