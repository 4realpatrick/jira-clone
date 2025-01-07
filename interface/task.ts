import { type Models } from "node-appwrite";
import { ETaskStatus } from "./status";
import { TProject } from "./project";
import { TMember } from "./member";
import { checkFileds } from "@/lib/get-update-record";

export type TUpdateRecord = Models.Document & {
  createdAt: string;
  user: string;
  updateRecordDetail: {
    field: (typeof checkFileds)[number];
    old: string;
    new: string;
  }[];
};

export type TTask = Models.Document & {
  name: string;
  workspaceId: string;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  status: ETaskStatus;
  updateRecords: TUpdateRecord[];
  description?: string;
  position: number;
  tags?: string[];
};

export type TPopulatedTask = TTask & {
  project: TProject;
  assignee: TMember;
};
