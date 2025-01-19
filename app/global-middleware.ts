import { createMiddleware, registerGlobalMiddleware } from "@tanstack/start";
import { defineMiddleware } from "vinxi/http";
import { getCookieJSON } from "./utils/server";

export default defineMiddleware({
  onRequest: async (event) => {
    const session = getCookieJSON("auth-session");
    if (session) {
      event.context.auth = { isAuthenticated: true, ...session };
    } else {
      event.context.auth = { isAuthenticated: false };
    }
  },
});
