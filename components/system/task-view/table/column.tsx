"use client";

import { compareAsc, format } from "date-fns";
import { zhCN, enUS } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { TriangleAlert } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { TTask } from "@/interface/task";
import { ETaskStatus } from "@/interface/status";
import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Locale } from "@/i18n/interface";
import { MemberAvatar } from "../../member-list/avatar";
import { DataTableColumnHeader } from "./header";

const localeObj = {
  en: enUS,
  zh: zhCN,
} as const;

const statusOrder = {
  [ETaskStatus.BACKLOG]: 8,
  [ETaskStatus.TODO]: 9,
  [ETaskStatus.IN_PROGRESS]: 10,
  [ETaskStatus.IN_REVIEW]: 5,
  [ETaskStatus.DONE]: 20,
};

export const columns = (): ColumnDef<TTask>[] => {
  const t = useTranslations("pages.tasks.table");
  const ct = useTranslations("common");
  const locale = useLocale() as Locale;
  return [
    {
      accessorKey: "name",
      enableHiding: false,
      header({ column }) {
        return (
          <DataTableColumnHeader title={t("columns.task")} column={column} />
        );
      },
      cell({ row }) {
        const name = row.original.name;
        return <span className="line-clamp-1 font-semibold">{name}</span>;
      },
    },
    {
      accessorKey: "description",
      header({ column }) {
        return (
          <DataTableColumnHeader
            title={t("columns.description")}
            column={column}
          />
        );
      },
      cell({ row }) {
        const description = row.original.description;
        return (
          <span className="text-xs line-clamp-2">
            {description || t("columns.no_description")}
          </span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "tags",
      header({ column }) {
        return (
          <DataTableColumnHeader title={t("columns.tags")} column={column} />
        );
      },
      cell({ row }) {
        const tags = row.original.tags ?? [];
        const id = row.original.$id;
        return (
          <div className="flex items-center gap-x-1 text-xs">
            {tags.length > 0
              ? tags.map((tag, index) => (
                  <Badge key={id + index} className="shrink-0">
                    {tag}
                  </Badge>
                ))
              : null}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const tagsA = rowA.original.tags ?? [];
        const tagsB = rowB.original.tags ?? [];
        return tagsA.length > tagsB.length ? 1 : -1;
      },
    },
    {
      accessorKey: "status",
      header({ column }) {
        return (
          <DataTableColumnHeader title={t("columns.status")} column={column} />
        );
      },
      cell({ row }) {
        const status = row.original.status;
        return (
          <Badge variant={status as BadgeProps["variant"]} className="py-1">
            <span className="flex items-center gap-x-2 text-xs">
              {ct(`task_statuses.${status}`)}
            </span>
          </Badge>
        );
      },
      sortingFn(cur, next) {
        const curStatusOrder = statusOrder[cur.original.status];
        const nextStatusOrder = statusOrder[next.original.status];
        if (curStatusOrder === nextStatusOrder) {
          return 0;
        } else {
          return curStatusOrder < nextStatusOrder ? -1 : 1;
        }
      },
    },
    {
      accessorKey: "dueDate",
      header({ column }) {
        return (
          <DataTableColumnHeader title={t("columns.dueDate")} column={column} />
        );
      },
      cell({ row }) {
        const dueDate = row.original.dueDate;
        const today = new Date();
        const endDate = new Date(dueDate);
        const isOverdue = compareAsc(endDate, today) < 0;
        return (
          <span
            className={cn(
              "text-sm flex items-center gap-x-2",
              isOverdue ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {isOverdue && <TriangleAlert className="text-destructive size-4" />}
            {format(dueDate, "PPPP", {
              locale: localeObj[locale],
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "assignee",
      header({ column }) {
        return (
          <DataTableColumnHeader
            title={t("columns.assignee")}
            column={column}
          />
        );
      },
      cell({ row }) {
        const { name } = row.original.assignee;
        return (
          <div className="flex items-center gap-x-2 text-xs font-medium">
            <MemberAvatar name={name} className="size-6" />
            <p className="line-clamp-1">{name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "$createdAt",
      header({ column }) {
        return (
          <DataTableColumnHeader
            title={t("columns.$createdAt")}
            column={column}
          />
        );
      },
      cell({ row }) {
        const { $createdAt } = row.original;
        return (
          <span className="text-xs">
            {format($createdAt, "PPPP", {
              locale: localeObj[locale],
            })}
          </span>
        );
      },
    },
    {
      accessorKey: "$updatedAt",
      header({ column }) {
        return (
          <DataTableColumnHeader
            title={t("columns.$updatedAt")}
            column={column}
          />
        );
      },
      cell({ row }) {
        const { $updatedAt } = row.original;
        return (
          <span className="text-xs">
            {format($updatedAt, "PPPP", {
              locale: localeObj[locale],
            })}
          </span>
        );
      },
    },
  ];
};
