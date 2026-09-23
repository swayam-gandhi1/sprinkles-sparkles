"use client";

import { useSyncExternalStore } from "react";

/*
 * Client-side cart + wishlist, persisted to localStorage. Lines store only the
 * product slug and quantity; product details are resolved from the catalog at
 * render time so prices never go stale in storage. Checkout (Razorpay) will
 * read from here when it is added.
 */

export type CartLine = { slug: string; qty: number };

type State = {
  cart: readonly CartLine[];
  wishlist: readonly string[];
};

const STORAGE_KEY = "sprinkle-sparkle:cart:v1";
const MAX_QTY = 99;
const EMPTY: State = { cart: [], wishlist: [] };

let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isState(value: unknown): value is State {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<State>;
  return (
    Array.isArray(v.cart) &&
    v.cart.every((l) => typeof l?.slug === "string" && Number.isInteger(l?.qty) && l.qty > 0) &&
    Array.isArray(v.wishlist) &&
    v.wishlist.every((s) => typeof s === "string")
  );
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null");
    if (isState(parsed)) state = parsed;
  } catch {
    // Private mode / blocked storage / corrupt data: start empty.
  }
}

function commit(next: State) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — keep the in-memory state for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  // Keep tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => {
  load();
  return state;
};
const getServerSnapshot = () => EMPTY;

/** Whole store; server render and hydration see an empty cart, then the saved one. */
export function useCartState() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true once the saved cart can be read — avoids an "empty cart" flash. */
export function useCartReady() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function useCartCount() {
  return useCartState().cart.reduce((sum, line) => sum + line.qty, 0);
}

export function useIsWishlisted(slug: string) {
  return useCartState().wishlist.includes(slug);
}

export function addToCart(slug: string, qty = 1) {
  load();
  const existing = state.cart.find((line) => line.slug === slug);
  const cart = existing
    ? state.cart.map((line) => (line.slug === slug ? { ...line, qty: Math.min(MAX_QTY, line.qty + qty) } : line))
    : [...state.cart, { slug, qty: Math.min(MAX_QTY, qty) }];
  commit({ ...state, cart });
}

export function setQuantity(slug: string, qty: number) {
  load();
  const cart =
    qty <= 0
      ? state.cart.filter((line) => line.slug !== slug)
      : state.cart.map((line) => (line.slug === slug ? { ...line, qty: Math.min(MAX_QTY, qty) } : line));
  commit({ ...state, cart });
}

export function removeFromCart(slug: string) {
  setQuantity(slug, 0);
}

export function toggleWishlist(slug: string) {
  load();
  const wishlist = state.wishlist.includes(slug)
    ? state.wishlist.filter((s) => s !== slug)
    : [...state.wishlist, slug];
  commit({ ...state, wishlist });
}
