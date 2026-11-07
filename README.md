# nexxusdrako.au

The Nexxus Drako Multimedia website ([nexxusdrako.au](https://nexxusdrako.au/)), hosted on Cloudflare Pages.

Plain static HTML and CSS with no build step. Styling follows the Nexxus Drako Multimedia design system: the colour, type, spacing and radius tokens and the `nd-*` component classes live in `assets/css/site.css`, and the brand icon set is the sprite in `assets/icons.svg`.

- `index.html`: home
- `privacy/`, `music-licensing/`: policy pages
- `404.html`: not-found page
- `assets/brand/`: logo, avatar ring and low-poly pattern from the design system
- `assets/img/`: project and flag images

Google Analytics runs in Consent Mode v2 (advanced): storage is denied by default and granted only when the visitor accepts the cookie banner. `assets/js/consent.js` (included in every page's `<head>`) sets the defaults, loads gtag.js, shows the banner and stores the choice in localStorage. Any element with `data-cookie-settings` reopens the banner.

Paths are root-absolute, so preview locally from the repo root:

```bash
python -m http.server 8000
```
