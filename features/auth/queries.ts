"use server";

import { createSessionClient } from "@/lib/apprwite";

export const getCurrent = async () => {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.log("error:", error);
  }
};
