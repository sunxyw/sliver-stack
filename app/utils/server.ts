import { getCookie, setCookie } from "vinxi/http";
import type { CookieSerializeOptions } from "vinxi/http";
import { tryit } from "radash";

export const COOKIE_OPTIONS_BASE = {
  path: "/",
  secure: import.meta.env.PROD,
  httpOnly: true,
  sameSite: "lax",
} as const satisfies CookieSerializeOptions;

export function setCookieJSON(
  name: string,
  value: unknown,
  serializeOptions?: CookieSerializeOptions,
): void {
  const [stringifiedError, stringifiedValue] = tryit(JSON.stringify)(value);
  if (stringifiedError) return;

  const [encodedError, encodedValue] =
    tryit(encodeURIComponent)(stringifiedValue);
  if (encodedError) return;

  setCookie(name, encodedValue, serializeOptions);
}

export function getCookieJSON(name: string): unknown | undefined {
  const cookie = getCookie(name);
  if (!cookie) return undefined;

  const [decodedError, decodedValue] = tryit(decodeURIComponent)(cookie);
  if (decodedError) return undefined;

  const [parsedError, parsedValue] = tryit(
    JSON.parse as (value: string) => unknown,
  )(decodedValue);
  if (parsedError) return undefined;

  return parsedValue;
}
