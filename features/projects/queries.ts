"use server";

import { DATABASE_ID, PROJECT_ID } from "@/constant/config";
import { getMember } from "@/lib/get-member";
import { createSessionClient } from "@/lib/apprwite";
import { TProject } from "@/interface/project";

export const getProjectById = async ({ projectId }: { projectId: string }) => {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const project = await databases.getDocument<TProject>(
      DATABASE_ID,
      PROJECT_ID,
      projectId
    );

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) return null;

    return project;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
};
