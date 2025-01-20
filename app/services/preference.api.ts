import { createServerFn } from "@tanstack/start";
import { zodValidator } from "@tanstack/zod-adapter";
import { getHeader } from "vinxi/http";

import {
  type AvailableLanguageTag,
  availableLanguageTags,
  isAvailableLanguageTag,
  sourceLanguageTag,
} from "@/libs/i18n/runtime";
import { authMiddleware } from "@/middlewares/auth";
import { preferenceSchema } from "@/services/preference.schema";
import type { Preference } from "@/services/preference.schema";
import {
  COOKIE_OPTIONS_BASE,
  getCookieJSON,
  setCookieJSON,
} from "@/utils/server";

const PREFERENCE_COOKIE_NAME = "preference";
const PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const getPreference = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler<Preference>(async ({ context }) => {
    let preference: Preference | undefined;

    // 1. if user is authenticated get preference from remote
    if (context.auth.isAuthenticated) {
      // 1.1 get preference from remote
      // TODO: implement remote preference
      const preferenceRemote = null;

      // 1.2 if preference is found, parse it
      if (preferenceRemote !== null && typeof preferenceRemote === "object") {
        preference = parsePreference(preferenceRemote);
      }

      // 1.3 if preference is not found, get preference from cookie
      if (preference === undefined) {
        preference = parsePreference(getCookieJSON(PREFERENCE_COOKIE_NAME));
      }
    }
    // 2. else get preference from cookie
    else {
      preference = parsePreference(getCookieJSON(PREFERENCE_COOKIE_NAME));
    }

    // 3. if preference is not found, generate default preference
    if (preference === undefined) {
      preference = generateDefaultPreference();
    }

    setCookieJSON(PREFERENCE_COOKIE_NAME, preference, {
      ...COOKIE_OPTIONS_BASE,
      maxAge: PREFERENCE_COOKIE_MAX_AGE,
    });

    return preference;
  });

export const updatePreference = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(zodValidator(preferenceSchema.partial()))
  .handler<Preference>(async ({ context, data }) => {
    const preference = await getPreference();

    const preferenceUpdated = {
      ...preference,
      ...data,
    };

    if (context.auth.isAuthenticated) {
      // TODO: upsert preference to remote
    }

    setCookieJSON(PREFERENCE_COOKIE_NAME, preferenceUpdated, {
      ...COOKIE_OPTIONS_BASE,
      maxAge: PREFERENCE_COOKIE_MAX_AGE,
    });

    return preferenceUpdated;
  });

function parsePreference(data: unknown): Preference | undefined {
  if (data === null || data === undefined) return undefined;
  const preference = preferenceSchema.safeParse(data);
  return preference.success ? preference.data : undefined;
}

function generateDefaultPreference(): Preference {
  const acceptLanguageHeader = getHeader("Accept-Language");
  const acceptLanguages = parseAcceptLanguage(acceptLanguageHeader);
  const detectedLocale = detectLocale(acceptLanguages);

  return {
    locale: detectedLocale || sourceLanguageTag,
  };
}

function detectLocale(
  acceptLanguages: string[],
): AvailableLanguageTag | undefined {
  for (const acceptLanguage of acceptLanguages) {
    // exact match
    if (isAvailableLanguageTag(acceptLanguage)) return acceptLanguage;

    // base language match (e.g., "en" from "en-GB")
    const baseLanguage = new Intl.Locale(acceptLanguage).language;
    if (isAvailableLanguageTag(baseLanguage)) return baseLanguage;

    // base language fallback to region that is available
    const supportedRegionsLanguage = availableLanguageTags.filter(
      (lang) => new Intl.Locale(lang).language === baseLanguage,
    );
    if (supportedRegionsLanguage.length > 0) return supportedRegionsLanguage[0];
  }
}

function parseAcceptLanguage(acceptLanguageHeader?: string): string[] {
  if (!acceptLanguageHeader) return [];

  const languages = acceptLanguageHeader.split(",");

  const parsedLanguages = languages.map((lang) => {
    const [languageValue, qualityValue] = lang.trim().split(";q=");

    const quality = qualityValue ? Number.parseFloat(qualityValue) : 1;
    const language = languageValue.trim().toLowerCase();

    return { language, quality };
  });

  parsedLanguages.sort((a, b) => b.quality - a.quality);

  return parsedLanguages.map((lang) => lang.language);
}
