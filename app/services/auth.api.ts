import { api } from "@/libs/api-client";
import type { ApiDataResponse } from "@/types/api-types";
import type { Session } from "@/types/auth";
import { setCookieJSON } from "@/utils/server";
import { formOptions } from "@tanstack/react-form";
import { getFormData } from "@tanstack/react-form/start";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import type { Simplify } from "type-fest";
import { getEvent, getWebRequest } from "vinxi/http";
import { signInSchema } from "./auth.schema";

const AUTH_SESSION_COOKIE_NAME = "auth-session";
const AUTH_SESSION_COOKIE_MAX_AGE = 60 * 60;

export interface Authenticated extends Session {
  isAuthenticated: true;
}

export interface Unauthenticated {
  isAuthenticated: false;
}

export type Auth = Simplify<Authenticated | Unauthenticated>;

export const getAuth = createServerFn({ method: "GET" }).handler<Auth>(
  async () => {
    const event = getEvent();

    return event.context.auth;
  },
);

export const signInFormOpts = formOptions({
  defaultValues: {
    // TODO: remove default values
    username: "sunxyw",
    password: "abcABC123&^D",
    rememberMe: true,
  },
  validators: {
    onChange: signInSchema,
  },
});

// TODO: change to query (mutation), component use query
export const storeAuth = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const input = data instanceof FormData ? Object.fromEntries(data) : data;
    return signInSchema.parse(input);
  })
  .handler(async ({ data }) => {
    // TODO: request token from remote
    const response = await api
      .post("auth/login/mail", {
        json: {
          mail: data.username,
          password: data.password,
        },
      })
      .json<ApiDataResponse<string>>();

    const session = response.data;
    setCookieJSON(AUTH_SESSION_COOKIE_NAME, session, {
      maxAge: AUTH_SESSION_COOKIE_MAX_AGE,
    });

    throw redirect({
      to: ".",
    });
  });

// TODO: remove
export const getSignInFormDataFromServer = createServerFn({
  method: "GET",
}).handler(async () => {
  const request = getWebRequest();
  return getFormData({ request });
});
