"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { getCreateWorkspaceSchema, TCreateWorkspaceSchema } from "@/lib/schema";
import { Button } from "../ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";

interface ICreateWorkspaceFormProps {
  handleCancel?: () => void;
}

export const CreateWorkspaceForm: React.FC<ICreateWorkspaceFormProps> = ({
  handleCancel,
}) => {
  const validT = useTranslations("validation");
  const t = useTranslations("pages.workspace");
  const ct = useTranslations("common");
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const form = useForm<TCreateWorkspaceSchema>({
    resolver: zodResolver(getCreateWorkspaceSchema(validT)),
    defaultValues: {
      name: "",
    },
  });
  const onSumbit = (values: TCreateWorkspaceSchema) => {
    createWorkspace({ json: values });
  };
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">{t("form.title")}</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={ct("workspace_placeholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <DottedSeparator />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleCancel}
                  disabled={isPending}
                >
                  {ct("cancel")}
                </Button>
                <Button size="lg" type="submit" disabled={isPending}>
                  {ct("submit")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
