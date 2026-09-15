import { Phone, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

// Progressive disclosure keeps the bar to one line on every screen size.
const messages = [
  { text: "Free Shipping on Orders Above ₹2,000", icon: Truck, className: "flex" },
  { text: "Wide Range of Baking & Gifting Supplies", icon: Sparkles, className: "hidden md:flex" },
  { text: "100% Secure Payments", icon: ShieldCheck, className: "hidden xl:flex" },
] as const;

export function AnnouncementBar() {
  const { phone, phoneHref, whatsappHref } = siteConfig.contact;

  return (
    <aside aria-label="Store announcements" className="bg-blush-strong/70 text-foreground">
      <Container className="flex h-9 items-center justify-center gap-6 text-xs font-medium sm:justify-between">
        <ul className="flex items-center gap-6 lg:gap-8">
          {messages.map(({ text, icon: Icon, className }) => (
            <li key={text} className={cn("items-center gap-2", className)}>
              <Icon aria-hidden className="size-3.5 text-primary-strong" />
              {text}
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-5 sm:flex">
          <a href={phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-primary-strong">
            <Phone aria-hidden className="size-3.5 text-primary-strong" />
            {phone}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 transition-colors hover:text-primary-strong lg:flex"
          >
            <WhatsAppIcon aria-hidden className="size-3.5 text-whatsapp" />
            Chat on WhatsApp
          </a>
        </div>
      </Container>
    </aside>
  );
}
