# PR Checklist (Definition of Done)

Usa questa checklist nella descrizione della PR. Spunta ogni voce completata.

## Requisiti e UX
- [ ] Requisiti e criteri di accettazione soddisfatti
- [ ] UI conforme a palette/theme (`theme.json`) e card prodotto

## Flussi critici
- [ ] Verifica manuale in locale (`npm run dev`): catalogo
- [ ] Verifica manuale in locale (`npm run dev`): carrello
- [ ] Verifica manuale in locale (`npm run dev`): checkout

## Qualità del codice
- [ ] DRY/KISS/YAGNI rispettati; nessuna duplicazione
- [ ] SOLID applicato (SRP, composizione su estensione)
- [ ] Nomi chiari; funzioni/JSX brevi; nessun codice morto

## TypeScript
- [ ] `strict` senza errori
- [ ] Nessun `any` non giustificato; `unknown` + narrowing se necessario
- [ ] Tipi aggiornati in `src/types`; niente breaking non comunicate

## Integrazione Shopify
- [ ] Nuove query/mutazioni documentate in `docs/`
- [ ] Componenti consumatori aggiornati (`src/components/Cart`, `NavUser`, `SearchBar`)
- [ ] Webhook `app/api/revalidate` testato manualmente (payload atteso documentato)

## Accessibilità
- [ ] Alt text, focus visibile, ruoli ARIA pertinenti
- [ ] Contrasto coerente con la palette

## Sicurezza e configurazioni
- [ ] Nessun segreto in log o errori
- [ ] Nuove variabili `.env` documentate (scopo, default) e fallback sicuri nel codice

## Validazione tecnica
- [ ] `npm run lint` senza errori
- [ ] `npm run format` applicato
- [ ] `npm run build` eseguito se cambia runtime/API/tipi condivisi
- [ ] Test/snapshot componenti aggiornati (se presenti)

## Documentazione e PR
- [ ] Template PR compilato (motivazione, impatti, validazione, migrazioni)
- [ ] Link a documentazione aggiornata in `docs/`
- [ ] Workflow Gemini verificati (se applicabile)

## Stabilità
- [ ] Nessun warning/errore in console durante i flussi base
- [ ] Commit conformi a Conventional Commits
