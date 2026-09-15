import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { SkipLink } from "@/components/common/SkipLink";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import "./globals.css";

// Poppins for UI and headings; Dancing Script echoes the logo's hand-lettering.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={cn(poppins.variable, dancingScript.variable)}>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <MotionProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
