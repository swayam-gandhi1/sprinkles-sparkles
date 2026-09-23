import { FadeUp } from "@/components/animations/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ImageSlot } from "@/components/common/ImageSlot";
import { ScrollRow } from "@/components/common/ScrollRow";
import { Highlight, SectionHeading } from "@/components/common/SectionHeading";
import { InstagramIcon } from "@/components/common/SocialIcons";
import { Section } from "@/components/layout/Section";
import { ButtonArrow, ButtonLink } from "@/components/ui/Button";
import { instagramGallery } from "@/data/images";
import { siteConfig } from "@/lib/config/site";
import type { ImageAsset } from "@/types/content";

function GalleryTile({ image, href }: { image: ImageAsset; href: string | null }) {
  const className = "group relative block size-full overflow-hidden rounded-card shadow-card ring-4 ring-white";
  const content = (
    <>
      <ImageSlot
        image={image}
        decorative={Boolean(href)}
        sizes="(min-width: 768px) 30vw, 62vw"
        className="size-full"
        imageClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-[1.06]"
      />
      {href ? (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center bg-linear-to-br from-pink/55 via-coral/40 to-sunny/40 text-white opacity-0 transition duration-300 ease-premium group-hover:opacity-100"
        >
          <InstagramIcon className="size-8 drop-shadow" />
        </span>
      ) : null}
    </>
  );

  if (!href) return <div className={className}>{content}</div>;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
      <span className="sr-only">{image.alt} — view on Instagram</span>
    </a>
  );
}

/** The shop's own Instagram photos in a 3-column grid, like the profile itself. */
export function InstagramSection() {
  const { instagram } = siteConfig.social;

  return (
    <Section aria-labelledby="instagram-title">
      <FadeUp>
        <SectionHeading
          id="instagram-title"
          eyebrow="Follow along on Instagram"
          title={
            <>
              A Glimpse of <Highlight>Our World</Highlight>
            </>
          }
          description="Take a look at what's happening at Sprinkle & Sparkle — from new arrivals and festive collections to gifting ideas and creative finds."
          action={
            instagram ? (
              <ButtonLink href={instagram} target="_blank" rel="noopener noreferrer" variant="outline">
                <InstagramIcon aria-hidden />
                Follow Us on Instagram
                <ButtonArrow />
              </ButtonLink>
            ) : undefined
          }
        />
      </FadeUp>

      <StaggerContainer className="mt-10 lg:mt-12" stagger={0.06}>
        <ScrollRow className="pt-1 md:mx-0 md:grid md:grid-cols-3 md:pt-0 md:gap-4 md:overflow-visible md:px-0 md:pb-0 lg:gap-5">
          {instagramGallery.map((image) => (
            <li key={image.alt} className="aspect-square w-[62%] shrink-0 snap-start sm:w-[40%] md:w-auto">
              <StaggerItem variant="scaleIn" className="h-full">
                <GalleryTile image={image} href={instagram} />
              </StaggerItem>
            </li>
          ))}
        </ScrollRow>
      </StaggerContainer>
    </Section>
  );
}
