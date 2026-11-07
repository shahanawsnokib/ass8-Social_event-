# Instructions for coding agents

## Project

- Private Next.js 16.4.5 app (App Router), React 19, TypeScript, Tailwind CSS 4. Routes and root layout are in `src/app/`; shared UI in `src/components/ui/`; helpers in `src/lib/`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`). Write normal hook rules; do not add manual memoization, and check `node_modules/next/dist/docs/` for version-specific compiler guidance.
- shadcn uses the `base-nova` style on **Base UI** (`@base-ui/react`), not Radix. Existing components (see `src/components/ui/button.tsx`) import primitives as `@base-ui/react/button` and their prop types differ from Radix-based shadcn you may know. Match the existing `data-slot` + `class-variance-authority` pattern when adding components.
- `components.json` sets aliases `@/components`, `@/lib`, `@/hooks`. `cn` is re-exported from `src/lib/utils.ts` (it wraps the npm package `cn`, not `clsx`/`tailwind-merge`).
- Tailwind 4 is CSS-first: theme tokens are defined in `src/app/globals.css` (`@theme inline`, oklch CSS variables, dark mode via `.dark` class). There is no `tailwind.config` file.

## Gotchas

- `src/app/nabBer/page.tsx` is a 0-byte placeholder with no default export; `next build` fails until it has one. The home page (`src/app/page.tsx`) is currently an empty fragment — start work there.
- The `<!-- BEGIN:nextjs-agent-rules -->` ... `<!-- END:nextjs-agent-rules -->` block is auto-written by `next dev` (generator: `node_modules/next/dist/server/lib/generate-agent-files.js`). Keep it in this file or running dev recreates an uncommitted change.
- Tailwind CSS is loaded through a Turbopack rule (`turbopack.rules` in `next.config.ts`); dev uses Turbopack, so don't add Webpack-only config.
- Before writing or changing app code, read the relevant guide in `node_modules/next/dist/docs/` — this Next.js version's APIs and conventions may differ from your training data. Heed deprecation notices.

## Commands (Windows — use `npm.cmd`)

- Dev server: `npm.cmd run dev` → http://localhost:3000
- Lint (ESLint, flat config in `eslint.config.mjs`): `npm.cmd run lint`
- Production build: `npm.cmd run build`; then serve: `npm.cmd start`

There are no tests configured. Run lint and `npm.cmd run build` to verify changes, and state which checks you ran.

## Conventions

- Keep changes focused and match the existing TypeScript + Tailwind patterns.
- Prefer existing dependencies and `src/components/ui/` components; do not add a package unless the request requires it.
- Keep secrets out of source control; no credentials in client-side code.

<!-- BEGIN:nextjs-agent-rules -->

## Next.js version guidance

This version may have breaking changes to APIs, conventions, and file structure. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repository root) before writing code, and heed deprecation notices.

This block is written and re-added by `next dev`. Its generator is `node_modules/next/dist/server/lib/generate-agent-files.js`. Keep this block in the file so running the development server does not recreate an uncommitted change.

<!-- END:nextjs-agent-rules -->
