import { type Models } from "node-appwrite";
import { ETaskStatus } from "./status";

export type TTask = Models.Document & {
  name: string;
  workspaceId: string;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  status: ETaskStatus;
  description?: string;
  position: number;
  tags?: string[];
};
