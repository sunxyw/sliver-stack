import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import type { Locale } from "@/libs/i18n";
import { getI18n } from "@/services/i18n.api";

export const i18nQueryOptions = (locale: Locale) =>
  queryOptions({
    queryKey: ["i18n", { locale }],
    queryFn: () => getI18n({ data: locale }),
  });

export const useI18nQuery = (locale: Locale) => {
  return useSuspenseQuery(i18nQueryOptions(locale));
};
