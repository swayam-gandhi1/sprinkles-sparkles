import { WhatsAppIcon } from "@/components/common/SocialIcons";
import { siteConfig } from "@/lib/config/site";

/** Floating chat shortcut; eases in shortly after load (pure CSS, reduced-motion safe). */
export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 animate-rise place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_28px_-10px_rgb(26_158_80/0.7)] transition-[scale] duration-300 ease-premium [animation-delay:1.2s] hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon aria-hidden className="size-7" />
    </a>
  );
}
