import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { cn } from "@/lib/utils";

export function TaskDescriptionSkeleton() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
            {t("common.task_description")}
          </p>
          <Button size="sm" variant="outline" disabled>
            <Pencil className="size-4" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col items-center gap-4">
            <div
              className={cn(
                "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl",
                "transition-all duration-200 ease-in-out"
              )}
            >
              <div className="flex flex-row items-center gap-3">
                <div className="text-sm sm:text-lg animate-pulse w-full h-[224px] bg-primary rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
