import { type Models } from "node-appwrite";

export type TWorkspace = Models.Document & {
  name: string;
  imageUrl: string;
  description: string;
  inviteCode: string;
  userId: string;
};
