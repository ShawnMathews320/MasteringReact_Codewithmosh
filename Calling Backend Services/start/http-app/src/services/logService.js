import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    // details of our logging service
Sentry.init({
    dsn: "https://7c9c07e1791143b19aa9e322b75f87ff@o1152709.ingest.sentry.io/6230983",
    integrations: [new BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
    Sentry.captureException(error);
}

// has these methods that we can use in the rest of our application
export default {
    init,
    log
}