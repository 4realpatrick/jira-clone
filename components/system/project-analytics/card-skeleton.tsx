import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function CardSkeleton({ title }: { title: string }) {
  return (
    <div className="flex items-center flex-1">
      <Card className="w-full shadow-none border-none">
        <CardHeader>
          <div className="flex items-center gap-x-2.5">
            <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
              <span className="truncate text-base">{title}</span>
            </CardDescription>
            <div className="flex items-center gap-x-1">
              <div className="h-4 w-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <CardTitle className="text-3xl font-semibold">
            <div className="size-8 bg-primary rounded-full animate-pulse"></div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
