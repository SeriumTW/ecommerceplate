# Repository Guidelines

## Struttura del progetto
- `src/app` gestisce le route (`page.tsx`/`layout.tsx`); `src/layouts` ospita i template condivisi.
- `src/config`, `src/lib`, `src/hooks`, `src/types` centralizzano configurazioni Shopify, utility e tipi.
- Contenuti in `src/content`, asset in `public`, materiale interno in `docs`, automazioni in `scripts/` e `.github/workflows`.

## Comandi di build, test e sviluppo
- Installa con `yarn install` o `npm install`.
- `yarn dev` / `npm run dev`: server locale Turbopack (porta 3000).
- `yarn build` / `npm run build`: compila build di produzione.
- `yarn start` / `npm run start`: serve build per QA manuale.
- `yarn lint` / `npm run lint`: esegue `next lint`.
- `yarn format` / `npm run format`: applica Prettier + plugin Tailwind.
- `yarn remove-darkmode`: rimuove il tema scuro; via npm usa `node scripts/removeDarkmode.js && npm run format`.

## Stile di codice e convenzioni
- Indentazione 2 spazi, newline `LF`, UTF-8 (`.editorconfig`).
- Componenti React/TS in PascalCase, hook in camelCase, cartelle delle route in kebab-case.
- Lascia ordinare Tailwind a Prettier e lancia `lint`/`format` prima della PR.

## Linee guida per i test
- Verifica con `yarn dev`/`npm run dev` coprendo catalogo, carrello e checkout.
- Eventuali test accanto ai componenti (`Component.test.tsx`); nel PR descrivi i casi coperti manualmente.

## Commit e pull request
- Usa Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:` + frase imperativa breve).
- Raggruppa cambi correlati e cita issue nel corpo (`Refs #123`).
- Le PR includano descrizione, motivazione, test, media UI e verifica dei workflow Gemini.

## Linee guida visive
- Palette `#FFE4C4`/`#FADADD` con accento `#FF7A59`; aggiorna `theme.json` per coerenza `bg-`/`text-`.
- Titoli `font-primary`, testi `font-secondary`; gestisci gerarchie via classi `text-h*`.
- Card prodotto `rounded-3xl`, `shadow-lg/20` e hover `hover:-translate-y-1 transition-all`.

## Integrazione Shopify
- `src/lib/shopify` gestisce le chiamate alla Storefront API per prodotti, collezioni, carrelli e autenticazione clienti.
- I componenti `Cart`, `NavUser` e `SearchBar` consumano questi servizi per sincronizzare dati di carrello, account e catalogo.
- Le collezioni in homepage e nelle pagine prodotto vengono popolate tramite le query `getCollections`, `getCollectionProducts` e `getProduct`.
- Il webhook `app/api/revalidate` aggiorna la cache al variare di prodotti o collezioni su Shopify.

## Documentazione workflow
- `docs/` contiene procedure (release, onboarding, handoff); aggiorna o aggiungi pagine quando il processo cambia e linka la documentazione nelle PR.

## Configurazione e sicurezza
- Conservare le credenziali Shopify in `.env.local`, rigenerare token compromessi e documentare nel PR nuove variabili aggiornando `docs/` se il setup cambia.
