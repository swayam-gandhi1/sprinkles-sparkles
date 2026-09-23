import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/common/SocialIcons";
import { footerHelpLinks, footerQuickLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import type { NavLink } from "@/types/content";
import { Container } from "./Container";
import { WhatsAppButton } from "./WhatsAppButton";

const socialClass =
  "grid size-11 place-items-center rounded-full text-white shadow-card transition-[translate,filter] duration-300 ease-premium hover:-translate-y-0.5 hover:brightness-95";
const contactRowClass = "flex items-center gap-3 transition-colors hover:text-primary-strong";

/** Column title with a short brand-gradient underline. */
function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="text-sm font-semibold">
      {children}
      <span aria-hidden className="mt-2 block h-1 w-8 rounded-full bg-linear-to-r from-pink to-turquoise" />
    </h2>
  );
}

function LinkColumn({ title, links }: { title: string; links: readonly NavLink[] }) {
  return (
    <nav aria-label={title}>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary-strong">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { phone, phoneHref, email, location, whatsappHref } = siteConfig.contact;
  const { instagram } = siteConfig.social;
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white">
      <div aria-hidden className="h-1.5 bg-linear-to-r from-pink via-sunny via-60% to-turquoise" />
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo className="w-40" sizes="230px" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Everything you need to create, decorate and celebrate.
          </p>
          <ul aria-label="Social media" className="mt-5 flex gap-3">
            {instagram ? (
              <li>
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Sprinkle & Sparkle on Instagram" className={cn(socialClass, "bg-linear-to-br from-lavender-strong to-primary")}>
                  <InstagramIcon aria-hidden className="size-[18px]" />
                </a>
              </li>
            ) : null}
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className={cn(socialClass, "bg-whatsapp-strong")}>
                <WhatsAppIcon aria-hidden className="size-[18px]" />
              </a>
            </li>
          </ul>
        </div>

        <LinkColumn title="Quick Links" links={footerQuickLinks} />
        <LinkColumn title="Customer Help" links={footerHelpLinks} />

        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <address className="mt-4 space-y-3 text-sm text-muted-foreground not-italic">
            <a href={phoneHref} className={contactRowClass}>
              <Phone aria-hidden className="size-4 shrink-0 text-primary-strong" />
              {phone}
            </a>
            <p className="flex items-center gap-3">
              <MapPin aria-hidden className="size-4 shrink-0 text-primary-strong" />
              {location}
            </p>
            <a href={`mailto:${email}`} className={`${contactRowClass} break-all`}>
              <Mail aria-hidden className="size-4 shrink-0 text-primary-strong" />
              {email}
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={contactRowClass}>
              <WhatsAppIcon aria-hidden className="size-4 shrink-0 text-whatsapp" />
              Chat on WhatsApp
            </a>
          </address>
        </div>
      </Container>

      <div className="border-t border-border bg-cream">
        <Container className="flex flex-col items-center gap-2 py-5 text-center text-[0.8125rem] text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {year} Sprinkle &amp; Sparkle. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with
            <Heart aria-hidden className="size-3.5 fill-primary text-primary" />
            <span className="sr-only">love</span>
            in Khanna, Punjab
          </p>
        </Container>
      </div>

      {/* Fixed-position, but kept inside the footer landmark for assistive tech. */}
      <WhatsAppButton />
    </footer>
  );
}
