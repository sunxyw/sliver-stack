import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  getSignInFormDataFromServer,
  signInFormOpts,
  storeAuth,
} from "@/services/auth.api";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslations } from "use-intl";

export const Route = createFileRoute("/auth/sign-in")({
  component: AuthSignInPage,
  loader: async () => ({
    state: await getSignInFormDataFromServer(),
  }),
});

function AuthSignInPage() {
  const t = useTranslations();

  const { state } = Route.useLoaderData();
  const form = useForm({
    ...signInFormOpts(t),
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form method="POST" action={storeAuth.url} encType="multipart/form-data">
      <form.Field name="username">
        {(field) => (
          <FormItem>
            <FormLabel htmlFor={field.name}>Username</FormLabel>
            <Input
              placeholder="Username"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </FormItem>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <FormItem>
            <FormLabel htmlFor={field.name}>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </FormItem>
        )}
      </form.Field>

      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
