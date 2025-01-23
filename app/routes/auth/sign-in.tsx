import logoImage from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { LockIcon, UserIcon } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg px-32 py-16 mx-auto">
        <CardHeader className="p-0">
          <img
            src={logoImage}
            alt="Your Company"
            className="block w-auto h-24 mx-auto mb-16 dark:invert"
          />
          <CardTitle className="text-4xl font-normal text-center">
            登录
          </CardTitle>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent className="p-0">
          <form method="POST" action={storeAuth.url} encType="multipart/form-data">
            <div className="space-y-4">
              <form.Field name="username">
                {(field) => (
                  <FormItem>
                    <Input
                      placeholder="Username"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <Input.Icon side="left">
                        <UserIcon />
                      </Input.Icon>
                    </Input>
                  </FormItem>
                )}
              </form.Field>

              <form.Field name="password">
                {(field) => (
                  <FormItem>
                    <Input
                      type="password"
                      placeholder="Password"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <Input.Icon side="left">
                        <LockIcon />
                      </Input.Icon>
                    </Input>
                  </FormItem>
                )}
              </form.Field>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <label
                    htmlFor="remember-me"
                    className="text-gray-dim peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    下次自动登录
                  </label>
                </div>

                <div>
                  <a className="text-blue-normal" href="/auth/forgot-password">
                    忘记密码？
                  </a>
                </div>
              </div>

              <form.Subscribe
                selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting} variant="solid" size="lg" className="w-full">
                    {isSubmitting
                      ? m.acidic_round_shrimp_pout()
                      : m.teal_keen_badger_wave()}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
