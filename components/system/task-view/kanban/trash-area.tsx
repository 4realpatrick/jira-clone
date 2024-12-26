import { Trash2 } from "lucide-react";
import { Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";

export const TrashArea = () => {
  return (
    <Droppable droppableId="delete">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="sticky bottom-0 w-full"
          {...provided.droppableProps}
        >
          <div
            className={cn(
              "grid h-20 w-full shrink-0 place-content-center rounded border text-3xl",
              snapshot.isDraggingOver
                ? "border-destructive bg-destructive/20 text-destructive"
                : "bg-muted text-neutral-500"
            )}
          >
            <Trash2
              className={cn(snapshot.isDraggingOver && "animate-bounce")}
            />
          </div>
        </div>
      )}
    </Droppable>
  );
};
