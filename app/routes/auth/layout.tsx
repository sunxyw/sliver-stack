import * as m from "@/libs/i18n/messages";
import { logger } from "@/libs/logger";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import toast from "react-hot-toast";
import { z } from "zod";

export const Route = createFileRoute("/auth")({
  validateSearch: zodValidator(
    z.object({
      callbackURL: z.string().default("/"),
    }),
  ),
  beforeLoad: ({ context, search, location, preload }) => {
    if (context.auth.isAuthenticated) {
      if (!preload) {
        toast.error(m.best_proud_nuthatch_reap());
      }

      throw redirect({
        to: search.callbackURL,
      });
    }

    if (["/auth", "/auth/"].includes(location.pathname)) {
      throw redirect({
        to: "/auth/sign-in",
        search,
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
