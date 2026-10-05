import { Phone, ShieldCheck, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

const messages = [
  { text: "Wide Range of Baking & Gifting Supplies", icon: Sparkles },
  { text: "100% Secure Payments", icon: ShieldCheck },
] as const;

const contactClass =
  "flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-white/15 focus-visible:outline-white";

/** One copy of the mobile marquee content. The duplicate copy is hidden from assistive tech and tab order. */
function MarqueeItems({ duplicate = false }: { duplicate?: boolean }) {
  const { phone, phoneHref, whatsappHref } = siteConfig.contact;
  const linkProps = duplicate ? { tabIndex: -1 } : {};

  return (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {messages.map(({ text, icon: Icon }) => (
        <li key={text} className="flex items-center gap-2 whitespace-nowrap">
          <Icon aria-hidden className="size-3.5 text-sunny" />
          {text}
        </li>
      ))}
      <li>
        <a href={phoneHref} className={cn(contactClass, "whitespace-nowrap")} {...linkProps}>
          <Phone aria-hidden className="size-3.5 text-sunny" />
          {phone}
        </a>
      </li>
      <li>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(contactClass, "whitespace-nowrap")}
          {...linkProps}
        >
          <WhatsAppIcon aria-hidden className="size-3.5" />
          Chat on WhatsApp
        </a>
      </li>
    </ul>
  );
}

/**
 * Bright pink strip; white text on `primary` keeps ≥ 4.7:1 contrast. Phones and tablets show every
 * item in a continuous marquee (paused on hover/focus, static for reduced motion);
 * from `lg` up all four sit in one line.
 */
export function AnnouncementBar() {
  const { phone, phoneHref, whatsappHref } = siteConfig.contact;

  return (
    <aside
      aria-label="Store announcements"
      className="relative overflow-hidden bg-linear-to-r from-primary-hover via-primary to-primary-hover text-white"
    >
      <div className="flex h-9 items-center overflow-hidden text-xs font-medium motion-reduce:overflow-x-auto lg:hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          <MarqueeItems />
          <MarqueeItems duplicate />
        </div>
      </div>

      <Container className="relative hidden h-9 items-center justify-between gap-6 text-xs font-medium lg:flex">
        <ul className="flex items-center gap-8">
          {messages.map(({ text, icon: Icon }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon aria-hidden className="size-3.5 text-sunny" />
              {text}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={phoneHref} className={contactClass}>
            <Phone aria-hidden className="size-3.5 text-sunny" />
            {phone}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={contactClass}
          >
            <WhatsAppIcon aria-hidden className="size-3.5" />
            Chat on WhatsApp
          </a>
        </div>
      </Container>
    </aside>
  );
}
