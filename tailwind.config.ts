import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import shadcnPreset from "./etc/plugins/tailwind/shadcn-preset";

export default {
  presets: [shadcnPreset({ color: "gray" })],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: fontFamily.sans,
        mono: fontFamily.mono,
      },
    },
  },
} satisfies Config;
