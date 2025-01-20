import type { AvailableLanguageTag } from "@/libs/i18n/runtime";
import { preferenceSchema } from "@/services/preference.schema";
import { createServerFn } from "@tanstack/start";
import { zodValidator } from "@tanstack/zod-adapter";

export const getI18n = createServerFn({ method: "GET" })
  .validator(zodValidator(preferenceSchema.shape.locale))
  .handler(async ({ data }) => {
    return {
      locale: data as AvailableLanguageTag,
      timeZone: "UTC",
    } as const;
  });
