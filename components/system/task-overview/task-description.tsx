import { Pencil, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateTask } from "@/features/tasks/api/use-update-task";
import { TPopulatedTask } from "@/interface/task";

export function TaskDescription({ task }: { task: TPopulatedTask }) {
  const t = useTranslations();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);
  const { mutate: updateTask, isPending } = useUpdateTask();

  const handleSave = () => {
    updateTask({
      json: {
        description: value,
      },
      param: {
        taskId: task.$id,
      },
    });
  };
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{t("common.task_description")}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
          disabled={isPending}
        >
          {isEditing ? <X className="size-4" /> : <Pencil className="size-4" />}
        </Button>
      </div>
      <DottedSeparator className="my-2 lg:my-4" />
      <div className="flex flex-col gap-4">
        {isEditing ? (
          <>
            <Textarea
              value={value}
              rows={4}
              onChange={(e) => setValue(e.target.value)}
              disabled={isPending}
            />
            <Button
              onClick={handleSave}
              disabled={isPending}
              size="sm"
              className="w-fit ml-auto"
            >
              {isPending ? t("common.saving") : t("common.save")}
            </Button>
          </>
        ) : (
          <div className="select-none">
            {task.description || (
              <span className="text-muted-foreground">
                {t("common.no_description")}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
