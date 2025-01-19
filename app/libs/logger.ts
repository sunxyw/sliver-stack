import c from "ansi-colors";

type Method = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

const DISABLE_IN_PRODUCTION = false;

const APP_NAME = c.cyan.bold(` [${import.meta.env.VITE_APP_NAME}] `);

const prefixes: Record<Method, string> = {
  trace: c.gray("[TRACE]"),
  debug: c.white("[DEBUG]"),
  info: c.blue("[INFO]"),
  warn: c.yellow("[WARN]"),
  error: c.red("[ERROR]"),
  fatal: c.red.bold("[FATAL]"),
};

const methods: Record<Method, "log" | "debug" | "info" | "warn" | "error"> = {
  trace: "log",
  debug: "debug",
  info: "info",
  warn: "warn",
  error: "error",
  fatal: "error",
};

const logger: Record<Method, (...message: unknown[]) => void> = {
  trace: loggerFactory("trace"),
  debug: loggerFactory("debug"),
  info: loggerFactory("info"),
  warn: loggerFactory("warn"),
  error: loggerFactory("error"),
  fatal: loggerFactory("fatal"),
};

function loggerFactory(method: Method) {
  return (...message: unknown[]) => {
    if (DISABLE_IN_PRODUCTION && import.meta.env.PROD) return;

    const consoleLogger = console[methods[method]];
    const prefix = `${APP_NAME}${prefixes[method]}`;

    consoleLogger(prefix, ...message);
  };
}

export { logger };
