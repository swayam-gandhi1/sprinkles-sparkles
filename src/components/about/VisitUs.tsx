import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { InstagramIcon, WhatsAppIcon } from "@/components/common/SocialIcons";
import { tones } from "@/components/common/tones";
import { Section } from "@/components/layout/Section";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import type { Tone } from "@/types/content";

type ContactCard = {
  title: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: (props: { className?: string }) => ReactNode;
  tone: Tone;
};

/** Contact options — only details from site config, nothing invented (no hours or street address yet). */
export function VisitUs() {
  const { phone, phoneHref, email, location, whatsappHref } = siteConfig.contact;
  const { instagram } = siteConfig.social;

  const cards: ContactCard[] = [
    { title: "Visit our store", value: location, icon: (p) => <MapPin aria-hidden {...p} />, tone: "blush" },
    { title: "Call us", value: phone, href: phoneHref, icon: (p) => <Phone aria-hidden {...p} />, tone: "aqua" },
    {
      title: "Chat on WhatsApp",
      value: "Quick answers & orders",
      href: whatsappHref,
      external: true,
      icon: (p) => <WhatsAppIcon aria-hidden {...p} />,
      tone: "sunny",
    },
    { title: "Email us", value: email, href: `mailto:${email}`, icon: (p) => <Mail aria-hidden {...p} />, tone: "lavender" },
    ...(instagram
      ? [
          {
            title: "Follow on Instagram",
            value: "@sprinkle_and_sparkle__",
            href: instagram,
            external: true,
            icon: (p: { className?: string }) => <InstagramIcon aria-hidden {...p} />,
            tone: "cream" as const,
          },
        ]
      : []),
  ];

  return (
    <Section id="visit" aria-labelledby="visit-title" className="scroll-mt-24 lg:scroll-mt-32">
      <FadeUp>
        <SectionHeading
          id="visit-title"
          eyebrow="Get in touch"
          accent="teal"
          align="center"
          title={
            <>
              Visit or <Highlight>Reach Us</Highlight>
            </>
          }
          description="Not sure what you need? We're always happy to help you choose — drop by the store or message us."
        />
      </FadeUp>
      <StaggerContainer className="mt-10">
        <ul className="flex flex-wrap justify-center gap-4">
          {cards.map(({ title, value, href, external, icon: Icon, tone }) => {
            const content = (
              <>
                <span className={cn("grid size-12 place-items-center rounded-2xl", tones[tone].icon)}>
                  <Icon className="size-6" />
                </span>
                <span className="mt-4 block text-base font-semibold">{title}</span>
                <span className="mt-1 block text-sm [overflow-wrap:anywhere] text-muted-foreground">{value}</span>
              </>
            );
            const cardClass =
              "flex h-full flex-col items-center rounded-card border border-border bg-white p-6 text-center shadow-card";
            return (
              <li key={title} className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]">
                <StaggerItem className="h-full">
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={cn(
                        cardClass,
                        "transition-[translate,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-1 hover:border-blush-strong hover:shadow-card-hover",
                      )}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={cardClass}>{content}</div>
                  )}
                </StaggerItem>
              </li>
            );
          })}
        </ul>
      </StaggerContainer>
    </Section>
  );
}
