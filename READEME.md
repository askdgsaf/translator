# Translator API

Chinese ⇄ English translation backend (Node.js, TypeScript, Express),
built with hexagonal architecture.

## Status: Milestone 1, core domain and application layer

- Domain: Language, TranslationRequest (validated), TranslationResult
- Application: ports (translation provider, pinyin, phonetic) and TranslateText use case
- Tests: use case tested with fake adapters (Jest)
- Health endpoint: GET /health

## Scripts

- `npm run dev` start with auto-reload
- `npm test` run tests
- `npm run build` compile

## Planned

HTTP adapter, translation provider, pinyin (pinyin-pro), phonetic (IPA), Drizzle/PostgreSQL persistence, auth.