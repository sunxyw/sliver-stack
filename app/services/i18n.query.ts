import type { AvailableLanguageTag } from "@/libs/i18n/runtime";
import { getI18n } from "@/services/i18n.api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const i18nQueryOptions = (locale: AvailableLanguageTag) =>
  queryOptions({
    queryKey: ["i18n", { locale }],
    queryFn: () => getI18n({ data: locale }),
  });

export const useI18nQuery = (locale: AvailableLanguageTag) => {
  return useSuspenseQuery(i18nQueryOptions(locale));
};
