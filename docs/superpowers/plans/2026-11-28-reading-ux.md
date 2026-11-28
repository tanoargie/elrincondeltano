# Reading UX — Plan

Date: 2026-11-28
Spec: `docs/superpowers/specs/2026-11-28-reading-ux-design.md`

## Tasks

1. **`gatsby-node.ts`** — add `onCreateNode` (attach `fields.dateSort` and `fields.timeToRead` to `Mdx` nodes) and update `createPages` to sort by date and pass `newer`/`older` in page context.
2. **`src/utils/types.ts`** — add `date: string` to `Post`.
3. **`src/pages/index.tsx`** — sort the `allMdx` query and fetch `date`.
4. **`src/components/postPreview.tsx`** — render the date on the card.
5. **`src/templates/post.tsx`** — render reading time in the metadata row and next/previous navigation from `pageContext`.
6. Verify with `npm run typecheck` (user-run) and a Cloudflare Pages build; open a PR against `master`.

## Out of Scope

Locale date formatting, tag pages, RSS ordering, reading time on cards.
