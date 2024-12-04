"use server";

import { Query } from "node-appwrite";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/constant/config";
import { getMember } from "@/lib/get-member";
import { TWorkspace } from "@/interface/workspaces";
import { createSessionClient } from "@/lib/apprwite";

export const getWorkspaces = async () => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return { documents: [], total: 0 };
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const worksspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return worksspaces;
  } catch (error) {
    console.log("error:", error);
    return { documents: [], total: 0 };
  }
};

export const getWorkspaceById = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });
    if (!member) return null;

    const worksspace = await databases.getDocument<TWorkspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );
    return worksspace;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
};

export const getWorkspaceNameById = async (workspaceId: string) => {
  try {
    const { databases } = await createSessionClient();

    const worksspace = await databases.getDocument<TWorkspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );
    return {
      name: worksspace.name,
    };
  } catch (error) {
    console.log("error:", error);
    return {
      name: "",
    };
  }
};
