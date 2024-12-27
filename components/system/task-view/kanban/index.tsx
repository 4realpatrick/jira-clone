"use client";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { TPopulatedTask } from "@/interface/task";
import { ETaskStatus } from "@/interface/status";
import { RippleLoader } from "@/components/syntax/loader/ripple";
import { KanbanColumn } from "./column";
import { TrashArea } from "./trash-area";

const columns: ETaskStatus[] = [...Object.values(ETaskStatus).map((i) => i)];

export type TData = {
  [key in ETaskStatus]: TPopulatedTask[];
};
export type TUpdatesPayload = {
  $id: string;
  status: ETaskStatus;
  position: number;
};

export function Kanban({
  data,
  isPending,
  onChange,
  onDelete,
}: {
  data: TPopulatedTask[];
  isPending: boolean;
  onChange: (payload: TUpdatesPayload[]) => void;
  onDelete: (taskId: string) => void;
}) {
  const [tasks, setTasks] = useState<TData>({
    [ETaskStatus.BACKLOG]: [],
    [ETaskStatus.TODO]: [],
    [ETaskStatus.IN_PROGRESS]: [],
    [ETaskStatus.IN_REVIEW]: [],
    [ETaskStatus.DONE]: [],
  });
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const sourceStatus = source.droppableId as ETaskStatus;
      const destinationStatus = destination.droppableId as ETaskStatus;

      let updatesPayload: TUpdatesPayload[] = [];
      if (destination.droppableId === "delete") {
        const deleteTaskId = tasks[sourceStatus][source.index].$id;
        setTasks((prev) => {
          return {
            ...prev,
            [sourceStatus]: prev[sourceStatus].filter(
              (_, index) => index !== source.index
            ),
          };
        });
        onDelete(deleteTaskId);
        return;
      }
      setTasks((prev) => {
        const newTasks = { ...prev };
        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) {
          return prev;
        }
        const updatedMovedTask =
          sourceStatus !== destinationStatus
            ? {
                ...movedTask,
                status: destinationStatus,
              }
            : movedTask;

        newTasks[sourceStatus] = sourceColumn;

        const destinationColumn = [...newTasks[destinationStatus]];
        destinationColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destinationStatus] = destinationColumn;

        updatesPayload = [];

        updatesPayload.push({
          $id: updatedMovedTask.$id,
          status: destinationStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        newTasks[destinationStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: destinationStatus,
                position: newPosition,
              });
            }
          }
        });

        if (sourceStatus !== destinationStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                updatesPayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });
      onChange(updatesPayload);
    },
    [onChange, tasks]
  );
  useEffect(() => {
    const newTasks: TData = {
      [ETaskStatus.BACKLOG]: [],
      [ETaskStatus.TODO]: [],
      [ETaskStatus.IN_PROGRESS]: [],
      [ETaskStatus.IN_REVIEW]: [],
      [ETaskStatus.DONE]: [],
    };
    data.forEach((task) => {
      newTasks[task.status].push(task);
    });
    Object.keys(newTasks).forEach((status) => {
      newTasks[status as ETaskStatus].sort((a, b) => a.position - b.position);
    });
    setTasks(newTasks);
  }, [data]);

  if (isPending) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <RippleLoader />
      </div>
    );
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <>
        <div className="flex overflow-x-auto flex-1">
          {columns.map((column) => {
            return (
              <KanbanColumn column={column} data={tasks[column]} key={column} />
            );
          })}
        </div>
        <TrashArea />
      </>
    </DragDropContext>
  );
}
