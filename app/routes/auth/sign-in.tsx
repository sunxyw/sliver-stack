import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as m from "@/libs/i18n/messages";
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

export const Route = createFileRoute("/auth/sign-in")({
  component: AuthSignInPage,
  loader: async () => ({
    state: await getSignInFormDataFromServer(),
  }),
});

function AuthSignInPage() {
  const { state } = Route.useLoaderData();
  const form = useForm({
    ...signInFormOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <form method="POST" action={storeAuth.url} encType="multipart/form-data">
      <h1>{m.greeting({ name: "sunxyw" })}</h1>

      <form.Field name="username">
        {(field) => (
          <FormItem>
            <FormLabel htmlFor={field.name}>
              {m.clean_lost_shell_clip()}
            </FormLabel>
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
            <FormLabel htmlFor={field.name}>
              {m.left_yummy_butterfly_twist()}
            </FormLabel>
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
            {isSubmitting
              ? m.acidic_round_shrimp_pout()
              : m.teal_keen_badger_wave()}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
