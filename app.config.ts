import { defineConfig } from "@tanstack/start/config";
import TurboConsole from "unplugin-turbo-console/vite";
import type { App } from "vinxi";
import tsConfigPaths from "vite-tsconfig-paths";

const app = defineConfig({
  routers: {
    api: {
      entry: "app/entry-api.ts",
    },
    ssr: {
      entry: "app/entry-server.ts",
    },
    client: {
      entry: "app/entry-client.tsx",
    },
  },
  tsr: {
    routeToken: "layout",
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      TurboConsole(),
    ],
  },
  react: {
    babel: {
      plugins: [
        [
          "babel-plugin-react-compiler",
          {
            target: "19",
          },
        ],
      ],
    },
  },
});

function withGlobalMiddleware(app: App) {
  return {
    ...app,
    config: {
      ...app.config,
      routers: app.config.routers.map((router) => ({
        ...router,
        middleware:
          router.target !== "server" ? undefined : "app/global-middleware.ts",
      })),
    },
  };
}

export default withGlobalMiddleware(app);
