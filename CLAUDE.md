# website — notes for the agent

Personal portfolio exi.moe: resume (MDX), blog (MDX), contact form. Next.js 16 (App Router) with Tailwind 4 and
shadcn, brought onto the `github.com/exi66/starter` conventions. Unlike the other starter projects this one is **not
static**: it needs a server (server action for the contact form), so there is no GitHub Pages deploy. Dokploy builds
it with Nixpacks (`nixpacks.toml`) on every push to `main`. UI text is Russian + English.

## Commands

```
pnpm dev | build | start | test | typecheck | lint | format | format:check
```

Check every change with `pnpm lint && pnpm format:check && pnpm typecheck && pnpm test && pnpm build` (what CI runs,
plus `pnpm audit`). `typecheck` runs `next typegen` first (`next-env.d.ts` and route types are gitignored).

## Rules

- **shadcn components are generated, never hand-written or edited.** Add them with
  `pnpm dlx shadcn@latest add <name>` (style `base-sera`, Base UI primitives: no `asChild`, use the `render` prop or
  `buttonVariants` on links) into `src/components/ui/` (excluded from lint and prettier). Own components live in
  `src/components/`.
- **Theme comes from the starter** (`@exi/theme`). Never edit the theme part of `src/app/globals.css` (everything above
  the "website: project styles" comment); change it in the starter and reinstall with
  `pnpm dlx shadcn@latest add @exi/theme --overwrite`. Project CSS goes below that comment. The file is not formatted
  by prettier on purpose. `@source "../../contents"` makes Tailwind scan the MDX content for classes.
- **Theme switching** uses `next-themes` (the starter's `ThemeProvider` reads localStorage during render, which breaks
  SSR). It stores the same shared `theme` key with `light | dark | system` and sets the class on `<html>`.
- **i18n differs from the starter on purpose.** Locale is a URL segment (`/ru/...`, `/en/...`; `src/proxy.ts`
  redirects, `src/lib/dictionaries.ts` loads `src/messages/<lang>.json`) because the pages are server-rendered and
  indexed. Dictionaries must have identical keys (`test/messages.test.ts`). The language toggle also writes the shared
  `i18nextLng` key so the choice follows the user to the other projects; the server cannot read it, so it is not used to
  pick the initial locale. Do not copy the starter's `src/lib/i18n.ts` (react-i18next, client-only).
- **Content** lives in `contents/resume/<lang>/...` and `contents/blogs/<lang>/` (MDX, ignored by prettier); the page
  tree is `src/lib/routes-config.ts`, sidebar/search titles come from the `leftbar` keys of the dictionaries.
- Contact form: `src/app/[lang]/actions.ts` (server action → Discord webhook `DISCORD_HOOK`, see `.env.example`;
  validation shared with the form in `src/lib/contact.ts`, rate limit per IP in memory, honeypot field).
- After `pnpm add`, check `pnpm-workspace.yaml`: pnpm 12 may add `minimumReleaseAgeExclude` entries for fresh versions;
  remove them and use an older version. `allowBuilds` there is needed for `sharp` (next/image).
- Dependency updates: Renovate (`renovate.json` extends `github>exi66/starter`).
- Commit only when asked. CI (`.github/workflows/ci.yml`) runs on pushes/PRs to `main`. Package manager: pnpm 12
  (pinned in `package.json` and `nixpacks.toml`, keep them equal; Nixpacks installs it with `npm i -g` and calls it by `$(npm prefix -g)/bin/pnpm`: its Corepack cannot unpack pnpm 12 and the npm global bin dir is not on PATH there).
