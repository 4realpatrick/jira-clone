import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID } from "@/constant/config";
import { createSessionClient } from "@/lib/apprwite";
import { TMember } from "@/interface/member";

interface IGetMemerProps {
  workspaceId: string;
}
export const getMember = async ({ workspaceId }: IGetMemerProps) => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();
    if (!user) {
      return null;
    }
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("workspaceId", workspaceId),
      Query.equal("userId", user.$id),
    ]);
    return members.documents[0] as TMember | null;
  } catch (error) {
    return null;
  }
};
