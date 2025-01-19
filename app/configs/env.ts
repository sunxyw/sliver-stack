import * as v from "valibot";

const createEnv = () => {
  const EnvSchema = v.object({
    API_URL: v.string(),
    APP_URL: v.optional(v.pipe(v.string(), v.url())),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (key.startsWith("VITE_")) {
      acc[key.replace("VITE_", "")] = value;
    }
    return acc;
  }, {});

  const parsedEnv = v.safeParse(EnvSchema, envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
      The following variables are missing or invalid:
      ${Object.entries(parsedEnv.issues)
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n")}
      `,
    );
  }

  return parsedEnv.output;
};

export const env = createEnv();
