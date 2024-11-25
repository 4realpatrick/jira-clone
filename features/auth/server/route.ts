import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/apprwite";
import { setCookie, deleteCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constant";
import { sessionMiddleware } from "@/lib/session-middleware";
import { getSignInFormSchema, getSignUpFormSchema } from "@/lib/schema";

const app = new Hono()
  .get("/current", sessionMiddleware, async (ctx) => {
    const user = ctx.get("user");
    return ctx.json({ data: user });
  })
  .post("/login", zValidator("json", getSignInFormSchema()), async (ctx) => {
    const { email, password } = ctx.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(ctx, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return ctx.json({ success: true });
  })
  .post("/register", zValidator("json", getSignUpFormSchema()), async (ctx) => {
    const { email, password, username } = ctx.req.valid("json");
    const { account } = await createAdminClient();
    const user = await account.create(ID.unique(), email, password, username);
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(ctx, AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    console.log({ email, password, username });
    return ctx.json({ data: user });
  })
  .post("/logout", sessionMiddleware, async (ctx) => {
    const account = ctx.get("account");
    deleteCookie(ctx, AUTH_COOKIE);
    await account.deleteSession("current");
    return ctx.json({ success: true });
  });

export default app;
