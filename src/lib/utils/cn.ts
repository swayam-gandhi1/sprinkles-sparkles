import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register the custom tokens from src/styles/theme.css so conflicting
// classes (e.g. `rounded-card` vs `rounded-none`) merge correctly.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      container: ["narrow", "site", "wide"],
      spacing: ["gutter", "section-sm", "section", "section-lg"],
      radius: ["button", "card", "panel"],
      shadow: ["card", "card-hover", "header"],
      ease: ["premium"],
      animate: ["rise", "float", "settle"],
      font: ["sans", "display", "script"],
    },
  },
});

/** Compose class names; later Tailwind classes win over earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
