import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import {
  DATABASE_ID,
  MEMBERS_ID,
  PROJECT_ID,
  TASK_ID,
} from "@/constant/config";
import { TMember } from "@/interface/member";
import { TProject } from "@/interface/project";
import { ETaskStatus } from "@/interface/status";
import { TTask } from "@/interface/task";
import { createAdminClient } from "@/lib/apprwite";
import { getMember } from "@/lib/get-member";
import { getCreateTaskSchema } from "@/lib/schema";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
        projectId: z.string().nullish(),
        assigneeId: z.string().nullish(),
        status: z.nativeEnum(ETaskStatus).nullish(),
        search: z.string().nullish(),
        dueDate: z.string().nullish(),
      })
    ),
    async (c) => {
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");

      const { workspaceId, projectId, assigneeId, status, search, dueDate } =
        c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const query = [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ];
      if (projectId) {
        console.log("projectId:", projectId);
        query.push(Query.equal("projectId", projectId));
      }
      if (status) {
        console.log("status:", status);
        query.push(Query.equal("status", status));
      }
      if (assigneeId) {
        console.log("assigneeId:", assigneeId);
        query.push(Query.equal("assigneeId", assigneeId));
      }
      if (dueDate) {
        console.log("dueDate:", dueDate);
        query.push(Query.equal("dueDate", dueDate));
      }
      if (search) {
        console.log("search:", search);
        query.push(Query.search("name", search));
      }
      const tasks = await databases.listDocuments<TTask>(
        DATABASE_ID,
        TASK_ID,
        query
      );

      const projectIds = tasks.documents.map((task) => task.projectId);
      const assigneeIds = tasks.documents.map((task) => task.assigneeId);

      const projects = await databases.listDocuments<TProject>(
        DATABASE_ID,
        PROJECT_ID,
        projectIds.length > 0 ? [Query.contains("$id", projectIds)] : []
      );

      const members = await databases.listDocuments<TMember>(
        DATABASE_ID,
        MEMBERS_ID,
        assigneeIds.length > 0 ? [Query.contains("$id", assigneeIds)] : []
      );

      const assignees = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);
          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );

      const populatedTasks = tasks.documents.map((task) => {
        const project = projects.documents.find(
          (project) => project.$id === task.projectId
        );
        const assignee = assignees.find(
          (member) => member.$id === task.assigneeId
        );
        return {
          ...task,
          project,
          assignee,
        };
      });

      return c.json({
        data: {
          ...tasks,
          documents: populatedTasks,
        },
      });
    }
  )
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", getCreateTaskSchema()),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const {
        name,
        status,
        workspaceId,
        projectId,
        dueDate,
        assigneeId,
        description,
        tags,
      } = await c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const highestPositionTask = await databases.listDocuments<TTask>(
        DATABASE_ID,
        TASK_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderAsc("position"),
          Query.limit(1),
        ]
      );

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;

      const task = await databases.createDocument<TTask>(
        DATABASE_ID,
        TASK_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
          description,
          tags,
          position: newPosition,
        }
      );

      return c.json({ data: task });
    }
  );

export default app;