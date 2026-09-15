export type NewsletterResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

/**
 * Newsletter sign-up service. No provider is connected yet — wire this to the
 * chosen service (e.g. via Strapi) and the form UI keeps working unchanged.
 */
export async function subscribeToNewsletter(email: string): Promise<NewsletterResult> {
  void email;
  return { ok: false, reason: "not-configured" };
}
