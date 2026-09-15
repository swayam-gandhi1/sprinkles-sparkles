/**
 * Typed access to environment variables. Read env vars here, never inline in
 * components. See `.env.example` for the full list.
 *
 * Server-only secrets (Strapi token, Razorpay secret, Shiprocket credentials)
 * belong in a separate server-only module when those integrations are added,
 * and must never use the NEXT_PUBLIC_ prefix.
 */

const LOCAL_URL = "http://localhost:3000";

/**
 * Absolute site URL used for metadata. Order of preference:
 * 1. NEXT_PUBLIC_SITE_URL (blank values are ignored)
 * 2. Vercel's production domain (system env vars, available at build time)
 * 3. localhost
 * A missing scheme gets `https://`; an unparseable value falls back to localhost
 * so a misconfigured variable can never break the build.
 */
function resolveSiteUrl(): string {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (!candidate) return LOCAL_URL;

  const withScheme = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return LOCAL_URL;
  }
}

export const publicEnv = {
  siteUrl: resolveSiteUrl(),
} as const;
