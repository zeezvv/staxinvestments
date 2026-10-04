# Project Notes

## Architecture

- JSON-LD entities that appear on more than one page are exported as plain objects from `src/hooks/use-page-meta.ts` (e.g. `organizationJsonLd`) and spread with page-specific overrides, because an `@id` reference only resolves inside a node that is present on the same page.
