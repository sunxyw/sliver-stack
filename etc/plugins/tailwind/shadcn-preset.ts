import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import plugin from "tailwindcss/plugin.js";
import type { SetOptional } from "type-fest";

type Preset = SetOptional<Config, "content">;

function shadcnPreset(): Preset {
  return {
    darkMode: ["class", '[data-theme="dark"]'],
    plugins: [animatePlugin, createShadcnPlugin()],
  };
}

function createShadcnPlugin() {
  return plugin(() => {}, {});
}

export default shadcnPreset;
