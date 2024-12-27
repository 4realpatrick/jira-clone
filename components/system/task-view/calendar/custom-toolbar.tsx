import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { getDateLocale } from "@/lib/utils";
import { Locale } from "@/i18n/interface";

export function CustomToolbar({
  locale,
  date,
  onNavigate,
}: {
  locale: Locale;
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}) {
  return (
    <div className="flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
      <Button
        onClick={() => onNavigate("PREV")}
        variant="outline"
        size="icon"
        className="flex items-center"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
        <Calendar className="size-4 mr-2" />
        <p className="text-sm">
          {format(date, "MMMM yyyy", {
            locale: getDateLocale(locale),
          })}
        </p>
      </div>
      <Button
        onClick={() => onNavigate("NEXT")}
        variant="outline"
        size="icon"
        className="flex items-center"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
