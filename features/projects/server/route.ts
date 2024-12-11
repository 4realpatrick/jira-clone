import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECT_ID } from "@/constant/config";
import { getMember } from "@/lib/get-member";
import { sessionMiddleware } from "@/lib/session-middleware";
import { getCreateProjectSchema, getUpdateProjectSchema } from "@/lib/schema";
import { ERole } from "@/interface/role";
import { TProject } from "@/interface/project";
import { getProjectById } from "../queries";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { workspaceId } = c.req.valid("query");
      if (!workspaceId) {
        return c.json({ error: "Missing workspaceId" }, 400);
      }
      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const projects = await databases.listDocuments<TProject>(
        DATABASE_ID,
        PROJECT_ID,
        [Query.equal("workspaceId", workspaceId), Query.orderDesc("$createdAt")]
      );
      return c.json({ data: projects });
    }
  )
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", getCreateProjectSchema()),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");

      const { name, image, workspaceId } = c.req.valid("form");
      let uploadImageUrl: string | undefined;

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }

      const project = await databases.createDocument<TProject>(
        DATABASE_ID,
        PROJECT_ID,
        ID.unique(),
        {
          name,
          imageUrl: uploadImageUrl,
          creator: user.name,
          workspaceId,
        }
      );

      return c.json({ data: project });
    }
  )
  .patch(
    "/:projectId",
    sessionMiddleware,
    zValidator("form", getUpdateProjectSchema()),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");

      const { projectId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const existingProject = await databases.getDocument<TProject>(
        DATABASE_ID,
        PROJECT_ID,
        projectId
      );

      const member = await getMember({
        databases,
        workspaceId: existingProject.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      let uploadImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );

        uploadImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      } else {
        uploadImageUrl = image || "";
      }

      const project = await databases.updateDocument<TProject>(
        DATABASE_ID,
        PROJECT_ID,
        projectId,
        {
          name,
          imageUrl: uploadImageUrl,
        }
      );

      return c.json({ data: project });
    }
  )
  .delete("/:projectId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const { projectId } = c.req.param();

    const existingProject = await databases.getDocument<TProject>(
      DATABASE_ID,
      PROJECT_ID,
      projectId
    );

    const member = await getMember({
      databases,
      workspaceId: existingProject.workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== ERole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // TODO: delete tasks
    await databases.deleteDocument(DATABASE_ID, PROJECT_ID, projectId);

    return c.json({ data: { $id: projectId } });
  });

export default app;
