/**
 * Typed access to environment variables. Read env vars here, never inline in
 * components. See `.env.example` for the full list.
 *
 * Server-only secrets (Strapi token, Razorpay secret, Shiprocket credentials)
 * belong in a separate server-only module when those integrations are added,
 * and must never use the NEXT_PUBLIC_ prefix.
 */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
