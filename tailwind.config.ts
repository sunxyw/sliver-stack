import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import shadcnPreset from "./etc/plugins/tailwind/shadcn-preset";

export default {
  presets: [shadcnPreset()],
  plugins: [tailwindcssRadixColors],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', ...fontFamily.sans],
        mono: fontFamily.mono,
      },
    },
  },
} satisfies Config;
