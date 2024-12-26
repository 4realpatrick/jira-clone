import { type Models } from "node-appwrite";
import { ETaskStatus } from "./status";
import { TProject } from "./project";
import { TMember } from "./member";

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

export type TPopulatedTask = TTask & {
  project: TProject;
  assignee: TMember;
};
