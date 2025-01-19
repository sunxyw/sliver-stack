import { tKey } from "@/libs/i18n";
import { passwordSchema, usernameSchema } from "@/services/auth.schema";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useTranslations } from "use-intl";
import { z } from "zod";

export const Route = createFileRoute("/auth/sign-in")({
  component: AuthSignInPage,
});

const signInSchema = (t = tKey) =>
  z.object({
    username: usernameSchema(t),
    password: passwordSchema(t),
    rememberMe: z.boolean().optional(),
  });

function AuthSignInPage() {
  const t = useTranslations();

  const search = useSearch({ from: "/auth" });
}
