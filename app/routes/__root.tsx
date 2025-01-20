import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme";
import { setLanguageTag } from "@/libs/i18n/runtime";
import { authQueryOptions } from "@/services/auth.query";
import { i18nQueryOptions, useI18nQuery } from "@/services/i18n.query";
import {
  preferenceQueryOptions,
  usePreferenceQuery,
} from "@/services/preference.query";
import globalsCss from "@/styles/globals.css?url";
import { createMetadata } from "@/utils/seo";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import { outdent } from "outdent";
import type * as React from "react";
import { Toaster } from "react-hot-toast";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    const [auth, preference] = await Promise.all([
      context.queryClient.ensureQueryData(authQueryOptions()),
      context.queryClient.ensureQueryData(preferenceQueryOptions()),
    ]);

    setLanguageTag(preference.locale);
    await context.queryClient.ensureQueryData(
      i18nQueryOptions(preference.locale),
    );

    return {
      auth,
    };
  },
  head: () => ({
    meta: createMetadata({
      charSet: "utf-8",
      viewport: {
        width: "device-width",
        "initial-scale": "1",
        "maximum-scale": "1",
        "user-scalable": "no",
        "viewport-fit": "cover",
      },
      title: "Sliver Stack",
      description: "A full-stack TypeScript framework",
      robots: "follow, index",
    }),
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: globalsCss,
      },
    ],
    scripts: import.meta.env.PROD
      ? []
      : [
          {
            type: "module",
            children: outdent /* js */`
              import RefreshRuntime from "/_build/@react-refresh"
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
            `,
          },
        ],
  }),
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  pendingComponent: PendingComponent,
});

function RootDocument({ children }: React.PropsWithChildren) {
  const preferenceQuery = usePreferenceQuery();
  const i18nQuery = useI18nQuery(preferenceQuery.data.locale);

  return (
    <html lang={i18nQuery.data.locale} suppressHydrationWarning>
      <head>
        <Meta />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        <ScrollRestoration />
        <ReactQueryDevtools />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function PendingComponent() {
  return (
    <RootDocument>
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    </RootDocument>
  );
}
