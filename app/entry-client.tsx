import { StartClient } from "@tanstack/start";
import { StrictMode } from "react";
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

const router = createRouter();

hydrateRoot(
  // biome-ignore lint/style/noNonNullAssertion: This is guaranteed to be defined in a browser environment.
  document!,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
);
