/*
 * Diwali image coverage check — `npm run check:diwali-images`
 *
 * Compares every image under public/Diwali Products/ (recursively) with the
 * images referenced by src/data/diwali-products.ts. Each file must be either:
 *   USED          referenced by a product
 *   EXACT COPY    byte-identical to a used file
 *   SAME PHOTO    the same photograph saved again (re-compressed / re-encoded);
 *                 verified by comparing pixels with a used file
 * Anything else is UNUSED and fails the check (exit code 1), so a newly
 * uploaded photo can't be silently left out of the catalog.
 * It also fails if a product references a file that doesn't exist.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "public/Diwali Products";
const DATA = "src/data/diwali-products.ts";
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
// Mean absolute grey-level difference (0–255) on a 96×96 thumbnail. Re-saved copies
// of one photo measure < 2; different photos — even same-shoot colour variants — > 9.
const SAME_PHOTO_MAX_DIFF = 4;

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
const rel = (f) => f.split(path.sep).join("/").slice(ROOT.length + 1);

const all = walk(ROOT).map(rel);
const images = all.filter((f) => IMAGE.test(f));
const ignored = all.filter((f) => !IMAGE.test(f));

// Products: each record's slug, name and photo("…") references.
const source = readFileSync(DATA, "utf8");
const products = source
  .split(/\n  \{\n/)
  .slice(1)
  .map((block) => ({
    slug: block.match(/slug: "([^"]+)"/)?.[1],
    name: block.match(/name: "([^"]+)"/)?.[1],
    images: [...block.matchAll(/photo\("([^"]+)"\)/g)].map((m) => m[1]),
  }))
  .filter((p) => p.slug);
const referenced = new Set(products.flatMap((p) => p.images));

const md5 = (f) => createHash("md5").update(readFileSync(path.join(ROOT, f))).digest("hex");
const thumb = async (f) => {
  const img = sharp(path.join(ROOT, f)).rotate();
  const { width, height } = await img.metadata();
  const pixels = await img.resize(96, 96, { fit: "fill" }).greyscale().raw().toBuffer();
  return { pixels, ratio: width / height };
};
const difference = (a, b) => {
  let sum = 0;
  for (let i = 0; i < a.pixels.length; i++) sum += Math.abs(a.pixels[i] - b.pixels[i]);
  return sum / a.pixels.length;
};

let failed = false;
const missing = [...referenced].filter((f) => !existsSync(path.join(ROOT, f)));
if (missing.length) {
  failed = true;
  console.log("MISSING (referenced but not on disk):");
  for (const f of missing) console.log(`  ✗ ${f}`);
}

const used = images.filter((f) => referenced.has(f));
const usedInfo = await Promise.all(used.map(async (f) => ({ f, hash: md5(f), thumb: await thumb(f) })));
const exact = [];
const samePhoto = [];
const unused = [];
for (const f of images.filter((f) => !referenced.has(f))) {
  const hash = md5(f);
  const twin = usedInfo.find((u) => u.hash === hash);
  if (twin) {
    exact.push([f, twin.f]);
    continue;
  }
  const t = await thumb(f);
  const best = usedInfo
    .filter((u) => Math.abs(u.thumb.ratio - t.ratio) < 0.01)
    .map((u) => ({ f: u.f, d: difference(t, u.thumb) }))
    .sort((a, b) => a.d - b.d)[0];
  if (best && best.d <= SAME_PHOTO_MAX_DIFF) samePhoto.push([f, best.f, best.d]);
  else unused.push(f);
}

console.log(`\nIMAGE FILES FOUND: ${images.length}${ignored.length ? ` (+${ignored.length} non-image files ignored)` : ""}`);
console.log(`\nUSED (${used.length}):`);
for (const f of used) console.log(`  ✓ ${f}`);
console.log(`\nEXACT COPIES of a used file — not shown twice (${exact.length}):`);
for (const [f, of] of exact) console.log(`  = ${f}  →  ${of}`);
console.log(`\nSAME PHOTO saved again — not shown twice (${samePhoto.length}):`);
for (const [f, of, d] of samePhoto) console.log(`  ≈ ${f}  →  ${of}  (diff ${d.toFixed(2)})`);
console.log(`\nUNUSED (${unused.length}):`);
for (const f of unused) console.log(`  ✗ ${f}`);

console.log(`\nPRODUCTS (${products.length}):`);
products.forEach((p, i) => {
  console.log(`  ${i + 1}. ${p.name} (${p.images.length} image${p.images.length === 1 ? "" : "s"})`);
  for (const f of p.images) console.log(`       - ${f}`);
});

const accounted = used.length + exact.length + samePhoto.length;
console.log(`\nSUMMARY: ${images.length} files · ${used.length} used · ${exact.length} exact copies · ${samePhoto.length} same-photo copies · ${unused.length} unused · ${missing.length} missing`);
if (accounted !== images.length - unused.length) failed = true;
if (unused.length) failed = true;
process.exit(failed ? 1 : 0);
