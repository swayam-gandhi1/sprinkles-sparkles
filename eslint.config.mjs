import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "framer-motion",
              message: 'Framer Motion is now Motion — import from "motion/react".',
            },
            {
              name: "motion/react",
              importNames: ["motion"],
              message: 'LazyMotion runs in strict mode — use `import * as m from "motion/react-m"`.',
            },
            {
              name: "motion/react-client",
              message: 'LazyMotion runs in strict mode — use `import * as m from "motion/react-m"`.',
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
