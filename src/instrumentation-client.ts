import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d0a9ce28c5238f92e1d6d1d87d60a771@o4510689943420928.ingest.us.sentry.io/4510689956003840",
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
