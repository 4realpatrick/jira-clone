import { hc } from "hono/client";
import { TAppType } from "@/app/api/[...route]/route";

export const client = hc<TAppType>(process.env.NEXT_PUBLIC_APP_URL!);
