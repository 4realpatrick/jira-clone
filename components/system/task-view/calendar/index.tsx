import { useMemo, useState } from "react";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useLocale } from "next-intl";
import { RippleLoader } from "@/components/syntax/loader/ripple";
import { Locale } from "@/i18n/interface";
import { TPopulatedTask } from "@/interface/task";
import { getDateLocale } from "@/lib/utils";
import { EventCard } from "./event-card";
import { CustomToolbar } from "./custom-toolbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css";

export function DataCalendar({
  data,
  isPending,
}: {
  data: TPopulatedTask[];
  isPending: boolean;
}) {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    assignee: task.assignee,
    status: task.status,
    id: task.$id,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else {
      setValue(new Date());
    }
  };
  const locale = useLocale() as Locale;
  const locales = getDateLocale(locale);

  const localizer = useMemo(() => {
    return dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    });
  }, [locales]);

  if (isPending) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <RippleLoader />
      </div>
    );
  }

  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }) => <EventCard {...event} />,
        toolbar: () => (
          <CustomToolbar
            date={value}
            onNavigate={handleNavigate}
            locale={locale}
          />
        ),
      }}
    />
  );
}
