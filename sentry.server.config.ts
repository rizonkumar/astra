import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d0a9ce28c5238f92e1d6d1d87d60a771@o4510689943420928.ingest.us.sentry.io/4510689956003840",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
  integrations: [
    Sentry.vercelAIIntegration,
    Sentry.consoleLoggingIntegration({
      levels: ["log", "warn", "error"],
    }),
  ],
});
