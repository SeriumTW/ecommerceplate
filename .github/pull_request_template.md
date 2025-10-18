# Titolo PR

Breve descrizione in forma imperativa: cosa cambia e perché.

## Tipo di cambiamento
- [ ] feat (nuova funzionalità)
- [ ] fix (correzione bug)
- [ ] refactor (ristrutturazione interna, no cambi funzionali)
- [ ] chore/build/ci (script, tooling, pipeline)
- [ ] docs (documentazione)
- [ ] style (UI/CSS senza logica)
- [ ] perf (migliorie prestazionali)
- [ ] test (aggiunta/aggiornamento test)

## Motivazione e contesto
Perché serve questo cambiamento? Quale problema risolve o obiettivo raggiunge?

## Cambi principali
- File toccati e motivazioni sintetiche
- Eventuali migrazioni o note d’uso

## Issue di riferimento
Refs #<numero> (se applicabile)

## Validazione (comandi npm)
- [ ] `npm run lint` → 0 errori
- [ ] `npm run format` → formattazione applicata
- [ ] `npm run build` (se necessario) → build OK
- [ ] Verifica manuale con `npm run dev` dei flussi sotto

## Checklist Definition of Done
- [ ] Requisiti e criteri di accettazione soddisfatti
- [ ] UI conforme a palette/theme (`theme.json`) e card prodotto
- [ ] Verifica manuale (`npm run dev`): catalogo
- [ ] Verifica manuale (`npm run dev`): carrello
- [ ] Verifica manuale (`npm run dev`): checkout
- [ ] DRY/KISS/YAGNI rispettati; nessuna duplicazione
- [ ] SOLID applicato (SRP, composizione su estensione)
- [ ] Nomi chiari; funzioni/JSX brevi; nessun codice morto
- [ ] TypeScript `strict` senza errori; zero `any` non giustificati
- [ ] Tipi aggiornati in `src/types`; nessuna breaking non comunicata
- [ ] Nuove query/mutazioni Shopify documentate in `docs/`
- [ ] Componenti consumatori aggiornati (`Cart`, `NavUser`, `SearchBar`)
- [ ] Webhook `app/api/revalidate` testato manualmente (payload atteso)
- [ ] Alt text, focus visibile, ruoli ARIA pertinenti; contrasto OK
- [ ] Nessun segreto in log; nuove `.env` documentate e con fallback
- [ ] `npm run lint` OK; `npm run format` applicato; `npm run build` se necessario
- [ ] Test/snapshot componenti aggiornati (se presenti)
- [ ] Nessun warning/errore in console nei flussi base
- [ ] Conventional Commits rispettati

## Impatti e rollback
Impatti su runtime/API/tipi; strategia di rollback in caso di problemi.

## Media UI
Screenshot/GIF prima/dopo (se UI).

## Note per i revisori
Contesto aggiuntivo, decisioni architetturali, alternative considerate.

