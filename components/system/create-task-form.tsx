"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zhCN, enUS } from "date-fns/locale";
import { addDays, format } from "date-fns";
import {
  History,
  ListTodo,
  Pickaxe,
  Eye,
  Check,
  CalendarIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { KeywordsInput } from "@/components/common/tag-input";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useProjectId } from "@/hooks/use-project-id";
import { useCreateTask } from "@/features/tasks/api/use-create-task";
import { getCreateTaskSchema, TCreateTaskSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n/interface";
import { MemberAvatar } from "./member-list/avatar";
import { ETaskStatus } from "@/interface/status";
import { ProjectAvatar } from "./sidebar/projects/avatar";

interface ICreateTaskFormProps {
  handleCancel?: () => void;
  projectOptions: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  memberOptions: {
    id: string;
    name: string;
  }[];
}

export const StatusIcons = {
  [ETaskStatus.BACKLOG]: <History className="text-slate-300 size-4" />,
  [ETaskStatus.TODO]: <ListTodo className="text-neutral-900 size-4" />,
  [ETaskStatus.IN_PROGRESS]: <Pickaxe className="text-primary size-4" />,
  [ETaskStatus.IN_REVIEW]: <Eye className="text-yellow-300 size-4" />,
  [ETaskStatus.DONE]: <Check className="text-green-500 size-4" />,
};

export const CreateTaskForm: React.FC<ICreateTaskFormProps> = ({
  memberOptions,
  projectOptions,
  handleCancel,
}) => {
  const validT = useTranslations("validation");
  const t = useTranslations();
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const locale = useLocale() as Locale;
  const { mutate: createTask, isPending } = useCreateTask();

  const datePickerLocale = useMemo(() => {
    const obj = {
      zh: zhCN,
      en: enUS,
    };

    return obj[locale];
  }, [locale]);

  const form = useForm<TCreateTaskSchema>({
    resolver: zodResolver(
      getCreateTaskSchema(validT).omit({ workspaceId: true })
    ),
    defaultValues: {
      workspaceId,
      projectId,
      name: "",
      description: "",
      status: ETaskStatus.TODO,
      tags: [],
    },
  });

  const handleSelectPresetDate = (value: string) => {
    form.setValue("dueDate", addDays(new Date(), parseInt(value)));
  };
  const onSumbit = (values: TCreateTaskSchema) => {
    createTask(
      {
        json: {
          ...values,
          workspaceId,
        },
      },
      {
        onSuccess() {
          form.reset();
          handleCancel?.();
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none">
      <CardHeader className="flex p-7 sticky top-0 bg-background border-b">
        <CardTitle className="text-xl font-bold">
          {t("pages.tasks.form.title")}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)}>
          <CardContent className="px-7 py-5">
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pages.tasks.form.labels.task")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder={t("common.task_placeholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("pages.tasks.form.labels.description")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder={t("common.task_description_placeholder")}
                        maxLength={500}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      {t("pages.tasks.form.labels.due_date")}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>
                                {t("common.task_due_date_placeholder")}
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="flex w-auto flex-col space-y-2 p-2"
                        align="start"
                      >
                        <Select onValueChange={handleSelectPresetDate}>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("pages.tasks.form.date.preset")}
                            />
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
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={datePickerLocale}
                          disabled={(date) => addDays(date, 1) < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("pages.tasks.form.labels.assignee")}
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("common.task_assignee_placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem value={member.id} key={member.id}>
                            <div className="flex items-center gap-2">
                              <MemberAvatar
                                className="size-6"
                                name={member.name}
                              />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pages.tasks.form.labels.status")}</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("common.task_status_placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {Object.values(ETaskStatus).map((status) => (
                          <SelectItem value={status} key={status}>
                            <div className="flex items-center gap-x-2">
                              {StatusIcons[status]}
                              {t(`pages.tasks.form.status.${status}`)}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("pages.tasks.form.labels.project")}
                    </FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("common.task_project_placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem value={project.id} key={project.id}>
                            <div className="flex items-center gap-2">
                              <ProjectAvatar
                                className="size-6"
                                name={project.name}
                                imageUrl={project.imageUrl}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="tags">
                      {t("pages.tasks.form.labels.tags")}
                    </FormLabel>
                    <FormControl>
                      <KeywordsInput
                        id="tags"
                        placeholder={t("common.task_tags_placeholder")}
                        onKeywordsChange={field.onChange}
                        keywords={field.value || []}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter
            className={cn(
              "flex items-center justify-between border-t sticky bottom-0 bg-background py-4",
              !!!handleCancel && "justify-end"
            )}
          >
            {!!handleCancel && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleCancel}
                disabled={isPending}
              >
                {t("common.cancel")}
              </Button>
            )}
            <Button size="lg" type="submit" disabled={isPending}>
              {t("common.submit")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
