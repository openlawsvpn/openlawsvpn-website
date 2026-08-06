# Repository guidance

This repository builds the static Astro site for `openlawsvpn.com`.

- Preserve the public URL contract documented in `README.md`; review consumers
  before changing or redirecting an existing route.
- Edit source pages and shared assets, then run `npm run build`. Treat `dist/` as
  generated output and keep it synchronized when the repository's deployment
  workflow requires committed output.
- Do not copy live application or engine versions into prose. Link to the
  appropriate release channel or derive a value from its authoritative source.
- Keep legal, subscription, analytics, and advertising claims consistent across
  pricing, privacy, terms, and consent content.
- Never publish private repository or infrastructure details.
