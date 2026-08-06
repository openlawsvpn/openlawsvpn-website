# openlawsvpn website

Static Astro site for `openlawsvpn.com`.

## Development

```sh
npm install
npm run dev
npm run build
```

The production files are generated in `dist/`. GitHub Pages deploys that
directory, not the repository root.

## URL contract

The existing public routes are intentionally preserved: `/`, `/client/`,
`/relay/`, `/demo/`, `/privacy/`, `/terms/`, `/support/`, and `/pricing/`.
They are used by Google Ads, App Store and Play review, shared links, and
search engines. Do not change them or introduce redirects without a specific
reason.

The current HTML is the source content at those same paths. Small Astro route
wrappers in `src/pages/` produce the corresponding static files and add shared
site capabilities without changing their URLs.

## Languages

English is the server-rendered default. This keeps ad destinations and review
links deterministic. `public/i18n.js` provides a same-path language switcher
for English, German, French, Spanish, Italian, Brazilian Portuguese, Polish,
Japanese, and Korean. It stores only the visitor's functional language choice
in local storage. A browser using one of these languages receives a suggestion;
the site never redirects or changes language automatically.

The product, download, and Relay decision paths are translated first. Command
examples and code deliberately remain in English, and legal/support detail
should be translated by a qualified reviewer before it is presented as a
localized legal or support promise.

Add a language by extending the `supported`, `dictionary`, and `metadata`
entries in `public/i18n.js`. Same-path translations are not separately indexed
by search engines. Introduce localized paths only when a dedicated SEO and
localized-ads rollout is planned.
