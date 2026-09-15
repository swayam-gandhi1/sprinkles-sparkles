/**
 * Low-level HTTP helper for the data-access layer.
 *
 * Intended layering once backends are connected:
 *   components → lib/api/<service>.ts (e.g. products.ts) → apiFetch → Strapi/…
 * Components never call `fetch` or know about API URLs directly. Service
 * modules build URLs from `lib/config` and map raw responses to `src/types`.
 */

export class ApiError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
  }
}

export async function apiFetch<T>(url: string | URL, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  const response = await fetch(url, { ...init, headers });

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status, String(url));
  }

  return (await response.json()) as T;
}
