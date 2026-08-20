# Blog Restyle — Minimal & Clean

Date: 2026-08-20
Status: Approved

## Goal

Improve the visual design of the blog (index page, post preview cards, individual post page) using only Tailwind CSS — no new npm libraries.

## Constraints

- No new dependencies. Tailwind 3 utilities + existing CSS only.
- User verifies visually via `npm run develop` on localhost.
- Keep all existing features: logo, "Tano" text, RSS icon, CV link, "Contactame" button, tag filter, responsive grid.

## User Decisions

- Vibe: minimal & clean.
- Color scheme: light + dark mode (follow OS preference).
- Cards: remove "Leer más" button; the whole card becomes a link.
- Post page: add metadata header (subtitle, date, tags), cover image, and improved content typography.
- Fonts: system font stack. Nunito Sans is declared but never loaded today — drop it.

## Design

### 1. Global (`tailwind.config.js`, `src/styles/global.css`)

- `tailwind.config.js`: set `darkMode: 'media'` (no toggle UI). Remove the unused `font-ns` / Nunito Sans fontFamily entry; add `font-sans` system stack (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`) and `font-mono` (`ui-monospace, SFMono-Regular, Menlo, monospace`).
- `global.css`:
  - Base layer: `body` gets light/dark surface + text colors (`bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100`), antialiasing, system sans font.
  - Keep the existing `ul, ol` list styling but make it dark-mode aware.
  - Add a `.post-content` typography block (see section 4).

### 2. Index page (`src/pages/index.tsx`)

- Header:
  - Left: logo + italic "Tano" (unchanged content).
  - Right: RSS icon, CV link, "Contactame" — restyle Contactame as a slim outline button (`border`, `rounded`, `px-3 py-1.5`) instead of the current full green block. Keep emerald as accent color.
  - Title "El Rincón del Tano" larger (`text-3xl`/`text-4xl`, `font-bold`), tagline in muted color.
- Tag filter: keep `<select>` behavior; restyle with `rounded-lg border bg-white dark:bg-stone-900 px-3 py-2` and a focus ring. Label text stays.
- Grid: keep responsive column counts (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`, `auto-rows-fr`), change gap to `gap-6`.

### 3. Post preview card (`src/components/postPreview.tsx`)

- Root becomes `<Link to={`/content/${slug}`}>` (Gatsby Link) — whole card clickable; remove "Leer más" button.
- Card: `bg-white dark:bg-stone-900`, `rounded-lg`, `border border-stone-200 dark:border-stone-800`, `overflow-hidden`, `p-4` (or padded content), hover: `shadow-md` + slight translate; `focus-visible` ring for keyboard users.
- Image: full card width, fixed aspect ratio (`aspect-[3/2] object-cover`) — replaces the current tiny `w-1/2 h-2/6` sizing.
- Title: `font-semibold` + `line-clamp-2`. Subtitle: muted color + `line-clamp-2`.
- Tags: neutral chips — `text-xs rounded-full border border-stone-300 dark:border-stone-700 px-2 py-0.5` instead of dark filled pills.
- Card content must not overflow: use `flex flex-col` so the grid `auto-rows-fr` stretches evenly.

### 4. Post page (`src/templates/post.tsx`, `src/components/…`, `global.css`)

- Layout: centered column (`max-w-3xl mx-auto`), `m-4` becomes consistent padding.
- Back link to home: "← Volver" at top.
- Header block: cover image (rounded, full width of the column), title (`text-3xl/4xl font-bold`), subtitle (muted), date, tag chips (same chip style as cards).
- Wrap MDX children in `<article className="post-content">`.
- `.post-content` styles in `global.css` (hand-rolled, `@apply` + `dark:` variants — no typography plugin):
  - `h2`/`h3`: bold, sized, top margin.
  - `p`: `leading-relaxed`, bottom margin.
  - `a`: emerald, underline.
  - `blockquote`: left border, muted italic.
  - inline `code`: rounded stone background, mono font.
  - `pre`: rounded stone background block, padding, overflow-x scroll, mono font.
  - `ul`/`ol`: spacing (existing list rule applies).
  - `hr`, `img` (rounded corners) as encountered.

## GraphQL Changes

- `index.tsx` query: already fetches `title`, `subtitle`, `slug`, `tags`, `imgPath` — no change needed unless image width changes.
- `templates/post.tsx` query: add `subtitle`, `date`, `tags`, `imgPath { childImageSharp { gatsbyImageData } }`.
- `frontmatter.date` is a string ("Sat, 1 Mar 2025") — display as-is; if formatting is needed use `new Date(...).toLocaleDateString` guarded against invalid dates. MVP: display as-is.

## Out of Scope

- No dark-mode toggle button (OS preference only).
- No new fonts (system stack).
- No design changes to 404 page, SEO component, or feed.
- No content (MDX) edits.

## Verification

- `npm run typecheck` passes.
- `npm run develop` — user visually checks index, card hover/click, tag filter, dark mode (via OS setting), and a post page.
