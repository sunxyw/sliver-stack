import { availableLanguageTags } from "@/libs/i18n/runtime";
import { z } from "zod";

export const preferenceSchema = z.object({
  locale: z.enum(availableLanguageTags),
});

export type Preference = z.infer<typeof preferenceSchema>;
