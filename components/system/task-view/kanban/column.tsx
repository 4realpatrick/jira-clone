import { useTranslations } from "next-intl";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ETaskStatus } from "@/interface/status";
import { TPopulatedTask } from "@/interface/task";
import { KanbanCard } from "./card";
import { KanbanHeader } from "./header";

export function KanbanColumn({
  column,
  data,
}: {
  column: ETaskStatus;
  data: TPopulatedTask[];
}) {
  const t = useTranslations("pages.tasks");
  return (
    <div className="flex-1 max-h-[60vh] overflow-y-auto bg-primary/15 rounded-md min-w-[280px] [&:not(:last-child)&:not(:first-child)]:mx-2">
      <KanbanHeader
        column={column}
        title={t(`status.${column}`)}
        taskCount={data.length}
      />
      <Droppable droppableId={column}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] py-2 px-1.5"
          >
            {data.map((task, index) => (
              <Draggable key={task.$id} draggableId={task.$id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <KanbanCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
