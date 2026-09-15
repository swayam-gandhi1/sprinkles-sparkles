"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Button } from "@/components/ui/Button";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { cn } from "@/lib/utils/cn";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "done"; tone: "success" | "info"; message: string };

const messages = {
  success: "Thank you! You're now part of the Sprinkle & Sparkle circle.",
  notConfigured: "Newsletter sign-ups are opening soon — thank you for your interest!",
  failed: "Something went wrong. Please try again in a moment.",
};

export function NewsletterForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const inputId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    setStatus({ state: "submitting" });
    const result = await subscribeToNewsletter(email);

    if (result.ok) {
      form.reset();
      setStatus({ state: "done", tone: "success", message: messages.success });
    } else {
      const message = result.reason === "not-configured" ? messages.notConfigured : messages.failed;
      setStatus({ state: "done", tone: "info", message });
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2 sm:rounded-button sm:border sm:border-border sm:bg-white sm:p-1.5 sm:shadow-card sm:focus-within:outline-2 sm:focus-within:outline-offset-2 sm:focus-within:outline-ring">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email address"
          className="h-12 w-full min-w-0 flex-1 rounded-button border border-border bg-white px-5 text-sm placeholder:text-muted-foreground sm:h-11 sm:border-0 sm:focus-visible:outline-none"
        />
        <Button type="submit" disabled={status.state === "submitting"} className="h-12 sm:h-11">
          {status.state === "submitting" ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      <div aria-live="polite" className="mt-3 min-h-6 text-center text-sm sm:text-left">
        <AnimatePresence mode="wait">
          {status.state === "done" ? (
            <m.p
              key={status.message}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(status.tone === "success" ? "text-accent" : "text-foreground/80")}
            >
              {status.message}
            </m.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
