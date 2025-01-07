import { TUpdateRecord } from "@/interface/task";
import { compareAsc } from "date-fns";

export const checkFileds = [
  "name",
  "description",
  "status",
  "dueDate",
  "tags",
  "assigneeId",
  "projectId",
] as const;

function toString({
  val,
  field,
}: {
  val: any;
  field: (typeof checkFileds)[number];
}) {
  if (field === "dueDate") {
    return String(new Date(val).getTime());
  } else if (Array.isArray(val)) {
    return val.join(",");
  } else {
    return val;
  }
}
export function getUpdateRecord({
  oldValue,
  newValue,
  field,
  memberOptions,
  projectOptions,
}: {
  oldValue: any;
  newValue: any;
  field: (typeof checkFileds)[number];
  projectOptions: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  memberOptions: {
    id: string;
    name: string;
  }[];
}): TUpdateRecord["updateRecordDetail"][number] | undefined {
  if (!!oldValue && !!newValue) {
    let isChanged = false;
    if (field === "dueDate") {
      const oldValueDate = (
        typeof oldValue === "string" ? new Date(oldValue).getTime() : oldValue
      ) as number;
      const newValueDate =
        typeof newValue === "string"
          ? new Date(newValue).getTime()
          : (newValue as Date).getTime();

      isChanged = compareAsc(oldValueDate, newValueDate) !== 0;
    } else if (field === "tags") {
      isChanged = oldValue?.toString() !== newValue?.toString();
    } else if (field === "assigneeId") {
      return oldValue === newValue
        ? undefined
        : {
            field,
            old: memberOptions.find((item) => item.id === oldValue)!.name,
            new: memberOptions.find((item) => item.id === newValue)!.name,
          };
    } else if (field === "projectId") {
      return oldValue === newValue
        ? undefined
        : {
            field,
            old: projectOptions.find((item) => item.id === oldValue)!.name,
            new: projectOptions.find((item) => item.id === newValue)!.name,
          };
    } else {
      isChanged = newValue !== oldValue;
    }
    if (isChanged) {
      const formattedOldValue = toString({
        val: oldValue,
        field,
      });
      const formattedNewValue = toString({
        val: newValue,
        field,
      });
      return {
        field,
        old: formattedOldValue,
        new: formattedNewValue,
      };
    }
  }
}
