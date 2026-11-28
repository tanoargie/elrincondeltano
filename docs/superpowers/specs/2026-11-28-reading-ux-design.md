# Reading UX — Sort, Dates, Next/Prev, Reading Time

Date: 2026-11-28
Status: Approved

## Goal

Improve how readers browse and move through the blog, with no new npm dependencies:

1. Newest-first ordering on the index page.
2. Publication date on each post preview card.
3. "Next / previous post" navigation at the bottom of each post.
4. Estimated reading time on each post.

## Current State

- `src/pages/index.tsx` queries `allMdx` with no `sort`, so card order is whatever Gatsby returns.
- `src/components/postPreview.tsx` renders only title / subtitle / tags — no date.
- `src/templates/post.tsx` has a "← Volver" back link but no next/previous navigation, and its metadata row shows `date` and `tags` but no reading time.
- `frontmatter.date` is a free-text string in `ddd, D MMM YYYY` form (e.g. `Mon, 28 Sep 2026`), so it cannot be sorted lexicographically.

## Decisions

- **Sort key is derived at build time from the existing `date` string** — no new frontmatter field and no edits to the 16 MDX files. A small deterministic parser (see below) normalizes the free-text date into a `YYYY-MM-DD` string used only for sorting; the human-facing `date` string is still displayed as-is.
- **Reading time** = `ceil(word count / 200)`, minimum 1, computed from the raw MDX body (frontmatter stripped). It is an estimate, not exact.
- **Dates are displayed as-is** (no locale reformatting) — out of scope.

## Design

### 1. `gatsby-node.ts` — build-time fields + page context

Add `exports.onCreateNode` that, for `Mdx` nodes only, uses `createNodeField` to attach:

- `dateSort` (`String`, `YYYY-MM-DD`) — parsed from `frontmatter.date`, or `null` if unparseable.
- `timeToRead` (`Int`) — word count of `rawBody` (frontmatter block removed) ÷ 200, ceiling, min 1.

Date parser accepts the two formats this blog uses (or may use):

- `ddd, D MMM YYYY` — e.g. `Mon, 28 Sep 2026`, `Sat, 1 Mar 2025` (current format).
- `YYYY-MM-DD` — e.g. `2026-09-28` (future, if a sortable field is ever preferred).

In `createPages`, query `allMdx(sort: { fields: [fields___dateSort, frontmatter___title], order: [DESC, ASC] })` and pass each page's nearest neighbours into `context` as `newer` / `older` (`{ slug, title }` or `null`).

### 2. `src/pages/index.tsx`

- Add `sort: { fields: [fields___dateSort, frontmatter___title], order: [DESC, ASC] }` to the `allMdx` query.
- Add `date` to the `frontmatter` selection.

### 3. `src/components/postPreview.tsx` + `src/utils/types.ts`

- Add `date: string` to the `Post` type.
- Render the date on the card as small muted text (next to the title/subtitle).

### 4. `src/templates/post.tsx`

- Accept `pageContext` (`{ newer, older }`).
- Metadata row: `date · X min de lectura` (reading time from `fields.timeToRead`), keeping tags.
- Bottom navigation: `← Anterior` (older post) and `Siguiente →` (newer post), each linking to `/content/<slug>`, omitted when there is no neighbour.

## Out of Scope

- Locale date reformatting, tag pages, RSS feed ordering, reading time on cards, drop caps, reading-progress bar.

## Verification

- `npm run typecheck` passes.
- Cloudflare Pages build succeeds (`NODE_VERSION=22`, existing overridden build command).
- User visually checks: `river` (`Mon, 28 Sep 2026`) appears first on the index; cards show dates; next/prev links appear at the bottom of posts; reading time appears on the post metadata row.
