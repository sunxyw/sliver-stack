import { z } from "zod";

export const NAME_MIN = 2;
export const NAME_MAX = 10;

export const USERNAME_MIN = 4;
export const USERNAME_MAX = 20;
export const USERNAME_REGEX = /^[\d_a-z-]*$/;

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 100;
export const PASSWORD_ONE_UPPERCASE_REGEX = /.*[A-Z].*/;
export const PASSWORD_ONE_LOWERCASE_REGEX = /.*[a-z].*/;
export const PASSWORD_ONE_NUMBER_REGEX = /.*\d.*/;
export const PASSWORD_ONE_SPECIAL_REGEX =
  /.*[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}~-].*/;

export const nameSchema = z.string().min(NAME_MIN).max(NAME_MAX);

export const emailSchema = z.string().email();

export const usernameSchema = z
  .string()
  .regex(USERNAME_REGEX)
  .min(USERNAME_MIN)
  .max(USERNAME_MAX);

export const passwordSchema = z
  .string()
  .regex(PASSWORD_ONE_UPPERCASE_REGEX)
  .regex(PASSWORD_ONE_LOWERCASE_REGEX)
  .regex(PASSWORD_ONE_NUMBER_REGEX)
  .regex(PASSWORD_ONE_SPECIAL_REGEX)
  .min(PASSWORD_MIN)
  .max(PASSWORD_MAX);

export const signInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});
