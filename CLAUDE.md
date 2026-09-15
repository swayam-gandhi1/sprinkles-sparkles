@AGENTS.md

# Sprinkle & Sparkle – The Cake Decor Shop

E-commerce storefront. Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · Motion (Framer Motion) · Lucide React.

## Ground rules

- **Design comes from the provided references only.** Don't invent colors, typography,
  layouts or copy, and don't imitate other shops. The references override any aesthetic
  suggestions in the `frontend-design` skill.
- **Logo**: use only the real asset in `public/images/branding/`, rendered through
  `src/components/common/Logo.tsx` (configured in `src/lib/config/site.ts`). Never recreate
  it with text, an icon, or a generated image.
- **Tokens**: all visual values live in `src/styles/theme.css`; components use token
  utilities (`bg-primary`, `rounded-card`, `py-section`, `ease-premium`), not raw values.
  Adding a custom token? Register it in `src/lib/utils/cn.ts` too.
- **Server Components by default.** Add `"use client"` only to small interactive leaves.
- **No API logic in components.** Data flows `component → src/lib/api/<service>.ts →
  apiFetch`. Env vars are read only in `src/lib/config/`. Strapi, Razorpay and
  Shiprocket are future integrations — not wired yet.
- **Animation**: follow the `sprinkle-motion` skill. Use `m.*` from `motion/react-m`
  (LazyMotion strict) and the primitives in `src/components/animations/`.
- Import files directly; no barrel `index.ts` files.

## Structure

```
src/app/                  routes, root layout, globals.css
src/components/ui/        generic primitives (Button, Card)
src/components/layout/    Container, Section; Navbar/Footer go here
src/components/common/    shared brand/a11y pieces (Logo, SkipLink)
src/components/products/  product-domain components
src/components/categories/
src/components/animations/ Motion provider, presets, Reveal, Stagger
src/data/                 static content/fixtures
src/hooks/                shared client hooks
src/lib/api/              data-access layer (apiFetch, future service modules)
src/lib/cart/             cart logic (future)
src/lib/config/           site config + typed env
src/lib/utils/            cn() and other pure helpers
src/types/                shared domain types
src/styles/theme.css      design tokens
```

## Homepage & content

- Sections live in `src/components/home/`, composed by `src/app/page.tsx`; site chrome
  (announcement bar, header, drawer, footer, WhatsApp button) in `src/components/layout/`.
- Copy and image slots live in `src/data/home.ts`, `categories.ts`, `navigation.ts`;
  contact details, Instagram URL and logo crop in `src/lib/config/site.ts`.
- All homepage photos go through ONE manifest: `src/data/images.ts`. Policy (client's
  choice): REAL shop photos only — no stock or AI imagery. They come from the shop's
  Instagram (@sprinkle_and_sparkle__) as high-quality WebP in `public/images/client/`.
  Sections without a real photo (need cards, Diwali feature, workshops, inspiration) are
  designed to work without one; add photos there only when the client supplies them.
- Don't invent claims (reviews, stats, awards, prices, delivery promises).

## Commands

`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck`

The npm scripts call each tool's Node entry file directly because the `&` in the folder
name breaks npm's Windows `.cmd` shims (so `npx next …` fails here; use `npm run …`).

## Project skills (`.claude/skills/`)

`frontend-design` (Anthropic), `motion` (official Motion AI Kit), `vercel-react-best-practices`,
`web-design-guidelines` (Vercel a11y/UX review), `sprinkle-motion` (this repo's animation conventions).
