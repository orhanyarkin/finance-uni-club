import Rollbar from 'rollbar';

// Check if we are on the client side
const isBrowser = typeof window !== 'undefined';

// Get the specific Vercel-generated token or fallback to a generic one
const clientToken = process.env.NEXT_PUBLIC_ROLLBAR_FINANCE_UNI_CLUB_CLIENT_TOKEN_1765275744 || process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN;
const serverToken = process.env.ROLLBAR_FINANCE_UNI_CLUB_SERVER_TOKEN_1765275744 || process.env.ROLLBAR_SERVER_TOKEN;

const rollbarConfig = {
  accessToken: isBrowser ? clientToken : serverToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV || 'development',
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: "1.0.0",
        guess_uncaught_frames: true
      }
    }
  }
};

export const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
