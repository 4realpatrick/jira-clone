import { useTranslations } from "next-intl";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { cn } from "@/lib/utils";

export function TaskUpdateRecordsSkeleton() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-y-4 col-span-2">
      <div className="rounded-lg p-4 border">
        <div className="flex items-center justify-start">
          <p className="text-lg font-semibold">{t("common.update_records")}</p>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          {[...new Array(4)].map((_, index) => (
            <div
              className={cn(
                "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl",
                // animation styles
                "transition-all duration-200 ease-in-out"
              )}
              key={index}
            >
              <div className="text-sm sm:text-lg animate-pulse w-full h-14 bg-primary rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
