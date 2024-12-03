import { Query, type Databases } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID } from "@/constant/config";

interface IGetMemerProps {
  databases: Databases;
  workspaceId: string;
  userId: string;
}
export const getMember = async ({
  databases,
  workspaceId,
  userId,
}: IGetMemerProps) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userId", userId),
  ]);
  return members.documents[0];
};
