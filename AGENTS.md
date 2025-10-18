# Repository Guidelines

## Struttura del progetto
- `src/app` gestisce le route (`page.tsx`/`layout.tsx`); `src/layouts` ospita i template condivisi.
- `src/config`, `src/lib`, `src/hooks`, `src/types` centralizzano configurazioni Shopify, utility e tipi.
- Contenuti in `src/content`, asset in `public`, materiale interno in `docs`, automazioni in `scripts/` e `.github/workflows`.

## Comandi di build, test e sviluppo
- Installa con `npm install`.
- `npm run dev`: server locale Turbopack (porta 3000).
- `npm run build`: compila build di produzione.
- `npm run start`: serve build per QA manuale.
- `npm run lint`: esegue `next lint`.
- `npm run format`: applica Prettier + plugin Tailwind.
- `npm run remove-darkmode`: rimuove il tema scuro.

## Stile di codice e convenzioni
- Indentazione 2 spazi, newline `LF`, UTF-8 (`.editorconfig`).
- Componenti React/TS in PascalCase, hook in camelCase, cartelle delle route in kebab-case.
- Lascia ordinare Tailwind a Prettier e lancia `lint`/`format` prima della PR.

## Linee guida per i test
- Verifica con `npm run dev` coprendo catalogo, carrello e checkout.
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

## Comunicazione agenti
- Gli agenti devono rispondere sempre in italiano durante le interazioni con l'utente.

---

## Ambito del documento
- Questo AGENTS.md si applica all’intero repository (sottoalbero radice).
- Eventuali AGENTS.md più profondi hanno precedenza su questo in caso di conflitto.
- Le sezioni seguenti integrano le linee guida sopra, non le sostituiscono.
- I comandi fanno riferimento a `npm`.

## Ruolo dell’agente e scope
- Operazioni consentite senza approvazione: piccole patch locali, refactor non distruttivi, aggiornamenti di tipi e documentazione, esecuzione di `lint`/`format`.
- Richiedono approvazione: modifiche a API pubbliche, rinomini di file/cartelle, aggiunta di dipendenze, operazioni distruttive, uso rete o comandi fuori workspace.
- Perimetro: lavora solo nel workspace; non esporre segreti; evita operazioni irreversibili.

## Ordine di precedenza istruzioni
- Priorità: prompt utente > AGENTS.md più vicino > AGENTS.md root > convenzioni del repo > buon senso tecnico.
- In caso di conflitto tra istruzioni, chiedi conferma prima di procedere.

## Workflow agente
- Ricognizione: usa `rg` per mappare file impattati e controlla eventuali `AGENTS.md` locali.
- Pianificazione: crea/aggiorna un piano a step brevi per task non banali; un solo step `in_progress` alla volta.
- Preamboli: prima di blocchi di comandi, spiega in 1 frase cosa stai per fare.
- Patch: applica modifiche minime e focalizzate con `apply_patch`; evita rinomini se non richiesti.
- Validazione: preferisci `npm run lint` e `npm run format`; esegui `npm run build` solo se impatta runtime/API.
- Chiusura: riepiloga file toccati, motivazione e prossimi passi suggeriti.

## Regole di modifica del codice
- Non cambiare naming o struttura file se non necessario/esplicito.
- Risolvi la causa radice; evita workaround temporanei non documentati.
- Mantieni lo stile esistente; non introdurre nuove dipendenze senza consenso.
- Non aggiungere header licenza; non creare branch/commit salvo richiesta.

## Principi di qualità del codice
- DRY: elimina duplicazioni; estrai util/shared dopo la seconda occorrenza.
- KISS: mantieni soluzioni semplici; evita over‑engineering e ottimizzazioni premature.
- YAGNI: implementa solo ciò che serve ai requisiti attuali.
- SOLID (adattato a TS/React):
  - SRP: componenti/hook con responsabilità unica e file brevi.
  - OCP: estendi via composizione/props, non modificare contratti stabili.
  - LSP: usa astrazioni coerenti; evita breaking su implementazioni scambiabili.
  - ISP: preferisci tipi piccoli e specifici; evita “mega‑interfacce”.
  - DIP: dipendenze verso astrazioni; per React usa context/injection, non import “hard” globali.
- Naming e design: nomi espliciti, niente abbreviazioni; funzioni corte; early‑return; purezza e immutabilità dove possibile; preferisci composizione a ereditarietà; evita boolean flag multi‑uso.
- TypeScript: `strict`; niente `any` (usa `unknown` + narrowing); prediligi union di literal a `enum`; usa `satisfies` per validare shape; `readonly` dove sensato; non esporre tipi interni in API pubbliche.
- React/Next: componenti funzionali; logica in hook composabili; niente stato derivato duplicato; effetti solo per side‑effects reali; memo/callback solo con evidenza di beneficio; attenzione a Client vs Server Components; chiavi stabili, accessibilità (aria/alt/focus).
- Error handling: non silenziare errori; usa errori tipizzati o discriminated unions; fornisci fallback UI adeguati a livello di route/componente; logga in modo sicuro senza segreti.
- Performance: evita lavoro inutile in render; evita allocazioni inline costose in deps; batch di chiamate dove possibile; cache/coalescing lato `src/lib/shopify`.

### Checklist PR (qualità)
- Niente duplicazioni evidenti; responsabilità unica rispettata.
- Nomi chiari; funzioni/JSX brevi e leggibili.
- Tipi stretti; zero `any` non giustificati; nessun dead code.
- Nessun side‑effect inatteso; errori gestiti e testati manualmente.
- Nessun aumento evitabile di complessità o dipendenze.
- UI accessibile e consistente con `theme.json` e palette.

## Integrazione Shopify (operativa)
- Prima di toccare `src/lib/shopify`, valuta impatti su `Cart`, `NavUser`, `SearchBar`.
- Documenta nuove query/mutazioni in `docs/` e aggiorna tipi in `src/types`.
- Per `app/api/revalidate`, specifica payload attesi e indica un test manuale rapido.

## Formato risposte dell’agente
- Italiano, conciso, con riferimenti file `path:line` e backtick per path/comandi.
- Evita formattazioni pesanti; usa bullet brevi e chiari.
- Per modifiche sostanziali: elenca file toccati e motivazione in breve.
- Evita stack trace completi e ogni informazione sensibile nei messaggi.

## Criteri di validazione
- Sempre: `npm run lint` e `npm run format` per allineare stile e ordinamento Tailwind.
- Opzionale: `npm run build` quando cambia logica runtime, tipi condivisi o API pubbliche.
- Niente test e2e se non presenti; descrivi i casi di test manuali nella PR.

## Gestione configurazioni
- Ogni nuova variabile `.env` deve essere documentata in `docs/` con scopo e default sicuro.
- Fornisci fallback sicuri nel codice; non loggare segreti.

## Pattern commit/PR per agenti
- Conventional Commits con scope, es. `fix(shopify): …`.
- Nelle PR virtuali includi: motivazione, impatti, come validare, eventuali migrazioni.

### Template PR virtuale (snippet)
- Titolo: `type(scope): cambiamento sintetico`
- Perché: contesto e problema risolto
- Cosa cambia: elenco file toccati e motivazioni
- Validazione: comandi eseguiti (`npm run lint/format/build`) e test manuali
- Impatti: runtime, API pubbliche, migrazioni, rollback
- Checklist: allega `docs/pr-checklist.md` compilata

## Definition of Done (DoD)
- Requisiti e criteri di accettazione soddisfatti; UX conforme alle linee visive (palette, `theme.json`, card prodotto).
- Flussi critici funzionanti in locale con `npm run dev`: catalogo, carrello, checkout.
- Qualità codice: DRY/KISS/YAGNI/SOLID rispettati; no duplicazioni; nomi chiari; funzioni/JSX brevi; nessun codice morto.
- TypeScript: `strict` ok; zero `any` non giustificati; tipi aggiornati in `src/types`; nessuna breaking change non comunicata.
- Shopify: nuove query/mutazioni documentate in `docs/`; componenti consumatori aggiornati (`Cart`, `NavUser`, `SearchBar`); webhook `app/api/revalidate` verificato manualmente.
- Accessibilità: alt text corretto, focus visibile, ruoli ARIA pertinenti; contrasto coerente con la palette.
- Sicurezza/config: nessun segreto in log; nuove variabili `.env` documentate con fallback sicuri.
- Validazione tecnica: `npm run lint` 0 errori; `npm run format` applicato; `npm run build` eseguito se cambia runtime/API/tipi; test/snapshot componenti aggiornati quando presenti.
- Documentazione/PR: template PR compilato (motivazione, impatti, validazione, migrazioni); link a `docs/` aggiornati; workflow Gemini verificati.
- Stabilità: nessun warning/errore inatteso in console durante navigazione base; commit conformi a Conventional Commits.

## Limitazioni e richieste di chiarimento
- In presenza di ambiguità o impatti ampi, chiedi chiarimenti proponendo 2–3 opzioni.
- Per azioni distruttive o che richiedono rete/permessi elevati, chiedi approvazione esplicita.

## Sandbox e approvazioni
- Rispetta le restrizioni di filesystem e rete dell’ambiente in uso.
- Non eseguire comandi distruttivi, con rete, o fuori workspace senza approvazione.
- Se un comando fallisce per sandbox, spiega il motivo e proponi alternativa o richiesta di escalation.

## Snippet utili
- Preamboli: “Esamino i file impattati e l’entrypoint.” / “Applico una patch mirata e aggiorno i tipi.” / “Eseguo `lint` e `format` per verificare lo stile.”
- Piano minimo: 1) Analizza impatto file 2) Applica patch 3) Aggiorna tipi/docs 4) Valida lint/format 5) Riepiloga e next steps.
