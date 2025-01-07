import { useLocale, useTranslations } from "next-intl";
import { compareAsc } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DottedSeparator } from "@/components/common/dotted-separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Locale } from "@/i18n/interface";
import { getFormattedTime } from "@/lib/utils";
import { TUpdateRecord } from "@/interface/task";
import { ETaskStatus } from "@/interface/status";
import { MemberAvatar } from "../member-list/avatar";

const Strong = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-primary mx-0.5">{children}</strong>
);

export function TaskUpdateRecords({
  updateRecords,
}: {
  updateRecords: TUpdateRecord[];
}) {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const getRecord = ({
    field,
    old,
    new: newValue,
  }: TUpdateRecord["updateRecordDetail"][number]) => {
    let formattedOldValue = old;
    let formattedNewValue = newValue;
    if (field === "dueDate") {
      formattedOldValue = getFormattedTime({
        str: new Date(Number(old)),
        formatStr: "PPP",
        locale,
      });
      formattedNewValue = getFormattedTime({
        str: new Date(Number(newValue)),
        formatStr: "PPP",
        locale,
      });
    } else if (field === "status") {
      formattedOldValue = t(`common.task_statuses.${old as ETaskStatus}`);
      formattedNewValue = t(`common.task_statuses.${newValue as ETaskStatus}`);
    } else if (field === "tags") {
      return t.rich(`common.update`, {
        field: t(`common.task_${field}`),
        old: formattedOldValue,
        new: formattedNewValue,
        strong: (chunk) => <Strong>{chunk}</Strong>,
        strongOld: (chunk) => {
          const tagsStr = (chunk as string[])[0];
          return (
            <div className="font-semibold text-primary mx-1 flex items-center gap-1">
              {tagsStr.split(",").map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))}
            </div>
          );
        },
        strongNew: (chunk) => {
          const tagsStr = (chunk as string[])[0];
          return (
            <div className="font-semibold text-primary mx-1 flex items-center gap-1">
              {tagsStr.split(",").map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))}
            </div>
          );
        },
      });
    }
    return t.rich(`common.update`, {
      field: t(`common.task_${field}`),
      old: formattedOldValue,
      new: formattedNewValue,
      strong: (chunk) => <Strong>{chunk}</Strong>,
      strongOld: (chunk) => <Strong>{chunk}</Strong>,
      strongNew: (chunk) => <Strong>{chunk}</Strong>,
    });
  };

  return (
    <div className="flex flex-col gap-y-4 col-span-2">
      <div className="rounded-lg p-4 border">
        <div className="flex items-center justify-start">
          <p className="text-lg font-semibold">{t("common.update_records")}</p>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <Accordion type="single" collapsible className="w-full">
            {updateRecords
              .sort((a, b) =>
                compareAsc(new Date(b.$createdAt), new Date(a.$createdAt))
              )
              .map((record) => {
                return (
                  <AccordionItem value={record.$id} key={record.$id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <MemberAvatar name={record.user} className="size-6" />
                        {record.user}
                        <span className="text-primary font-semibold">
                          {getFormattedTime({
                            str: new Date(record.$createdAt),
                            formatStr: "PPpp",
                            locale,
                          })}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-1">
                      {record.updateRecordDetail.map((detail, index) => (
                        <div className="flex items-center" key={index}>
                          {getRecord(detail)}
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
