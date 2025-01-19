import { defineMiddleware } from "vinxi/http";

export default defineMiddleware({
  onRequest: async (event) => {
    // const session = ...;

    // TODO: supply session data
    event.context.auth = { isAuthenticated: false };
  },
});
