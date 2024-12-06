import { type Models } from "node-appwrite";
import { ERole } from "./role";

export type TMember = Models.Document & {
  name: string;
  email: string;
  role: ERole;
  userId: string;
  workspaceId: string;
};
