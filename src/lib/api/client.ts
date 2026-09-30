import { publicEnv } from "@/lib/config/env";

export class ApiError extends Error {
  readonly status: number;
  readonly url: string;
  readonly data?: unknown;

  constructor(message: string, status: number, url: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
    this.data = data;
  }
}

export type FetchOptions = RequestInit & {
  timeoutMs?: number;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

/**
 * Builds a full URL from an endpoint path and optional query parameters.
 */
export function buildApiUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | null | undefined>,
): string {
  const base = endpoint.startsWith("http")
    ? endpoint
    : `${publicEnv.apiUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  if (!params) return base;

  const url = new URL(base);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

/**
 * Low-level HTTP helper for the data-access layer.
 * All public backend requests route through this function.
 */
export async function apiFetch<T>(
  urlOrPath: string | URL,
  options: FetchOptions = {},
): Promise<T> {
  const { timeoutMs = 10000, headers: customHeaders, ...restOptions } = options;

  const resolvedUrl =
    typeof urlOrPath === "string" && !urlOrPath.startsWith("http")
      ? `${publicEnv.apiUrl}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`
      : String(urlOrPath);

  const headers = new Headers(customHeaders);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(resolvedUrl, {
      ...restOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody: unknown = null;
      try {
        errorBody = await response.json();
      } catch {
        // Body was not JSON
      }

      throw new ApiError(
        `Request to ${resolvedUrl} failed with status ${response.status}`,
        response.status,
        resolvedUrl,
        errorBody,
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(`Request timeout after ${timeoutMs}ms`, 408, resolvedUrl);
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Unknown network error",
      0,
      resolvedUrl,
    );
  }
}
