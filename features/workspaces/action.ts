"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases, Query } from "node-appwrite";
import { AUTH_COOKIE } from "@/features/auth/constant";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/constant/config";
import { getMember } from "@/lib/get-member";
import { TWorkspace } from "@/interface/workspaces";

export const getWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = (await cookies()).get(AUTH_COOKIE);

    if (!session) return { documents: [], total: 0 };

    client.setSession(session.value);
    const databases = new Databases(client);
    const account = new Account(client);
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
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = (await cookies()).get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);
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
