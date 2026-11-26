# website

Личный сайт-портфолио exi.moe: резюме и проекты (MDX), блог, форма обратной связи. Next.js 16, Tailwind 4, shadcn с
общей темой [starter](https://github.com/exi66/starter). Основа — [aria-docs](https://github.com/nisabmohd/Aria-Docs).

## Запуск

```bash
pnpm install
cp .env.example .env   # DISCORD_HOOK — вебхук для формы обратной связи
pnpm dev
```

## Команды

```
pnpm dev          # dev-сервер
pnpm build        # сборка
pnpm start        # запуск собранного
pnpm test         # тесты
pnpm lint         # oxlint
pnpm format       # prettier
pnpm typecheck    # tsc
```

## Деплой

Сайт собирает Dokploy (Nixpacks) при пуше в `main`. GitHub Actions только проверяет код (`ci.yml`).

## Контент

Резюме — `contents/resume/<язык>/<страница>/index.mdx`, дерево страниц — `src/lib/routes-config.ts`. Записи блога —
`contents/blogs/<язык>/<slug>.mdx`.
