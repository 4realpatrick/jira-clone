import { useLocale, useTranslations } from "next-intl";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Locale } from "@/i18n/interface";
import { getDateLocale } from "@/lib/utils";

interface IDatePickerProps {
  value?: Date;
  showPreset?: boolean;
  onDateChange: (value?: Date) => void;
}

export function DatePicker({
  value,
  showPreset = false,
  onDateChange,
}: IDatePickerProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const handleSelectPreset = (value: string) => {
    onDateChange(addDays(new Date(), parseInt(value)));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full lg:w-auto h-8 border-dashed"
        >
          <div className="flex items-center gap-x-2 justify-between lg:justify-center w-full text-xs font-normal">
            <div className="flex items-center gap-x-2">
              <CalendarIcon className="size-4" />
              <span>{t("common.due_date")}</span>
            </div>

            {value && (
              <Badge className="rounded-sm font-normal">
                {format(value, "PPP")}
              </Badge>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col w-auto space-y-2 p-2"
        align="start"
      >
        {showPreset && (
          <Select onValueChange={handleSelectPreset}>
            <SelectTrigger>
              <SelectValue placeholder={t("pages.tasks.form.date.preset")} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">
                {t("pages.tasks.form.date.zero")}
              </SelectItem>
              <SelectItem value="1">
                {t("pages.tasks.form.date.one")}
              </SelectItem>
              <SelectItem value="3">
                {t("pages.tasks.form.date.three")}
              </SelectItem>
              <SelectItem value="7">
                {t("pages.tasks.form.date.seven")}
              </SelectItem>
              <SelectItem value="30">
                {t("pages.tasks.form.date.thirty")}
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        <Calendar
          numberOfMonths={2}
          mode="single"
          selected={value}
          onSelect={(date) => onDateChange(date as Date)}
          locale={getDateLocale(locale)}
          initialFocus
        />
        {value && (
          <Button variant="ghost" onClick={() => onDateChange(undefined)}>
            {t("common.clear")}
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
