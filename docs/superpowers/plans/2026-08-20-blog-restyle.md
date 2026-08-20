# Blog Restyle (Minimal & Clean) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the blog (index, post cards, post page) to a minimal & clean look with dark-mode support, using only Tailwind CSS — no new dependencies.

**Architecture:** Pure Tailwind utility classes in the React components, plus one `.post-content` typography block in `global.css` for MDX content (which can't carry class names). Dark mode via `darkMode: 'media'` (OS preference). Visual-only change; no behavior changes except removing the "Leer más" button (whole card becomes a link).

**Tech Stack:** Gatsby 5.13, React 18, Tailwind CSS 3.4 (core `line-clamp`, `aspect-ratio` available), TypeScript.

**Spec:** `docs/superpowers/specs/2026-08-20-blog-restyle-design.md`

**Verification convention (all tasks):** `npm run typecheck` must exit 0. User visually checks via `npm run develop`.

---

### Task 1: Global theme — dark mode + system fonts

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Enable dark mode and system font stack in `tailwind.config.js`**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 2: Update `src/styles/global.css` base styles**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  body {
    @apply bg-stone-50 text-stone-900 antialiased dark:bg-stone-950 dark:text-stone-100;
  }
}

@layer components {
  ul, ol {
    list-style-type: disc;
    margin: .5rem;
    padding: .5rem;
  }
}
```

Note: the old `font-family: 'Nunito Sans'` reference is dropped (font was never loaded — site rendered in system sans anyway).

- [ ] **Step 3: Verify**

Run: `npm run typecheck`
Expected: exits with code 0, no error output.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.js src/styles/global.css
git commit -m "style: add dark mode support and system font stack"
```

---

### Task 2: Index page — header, tag filter, grid

**Files:**
- Modify: `src/pages/index.tsx`

- [ ] **Step 1: Restyle the index page**

Replace lines 34-64 (the `return (...)` block of `IndexPage`) with:

```tsx
  return (
    <div className="font-sans">
      <header className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-1">
            <StaticImage src="../images/logo.svg" alt="Samser Logo" className="w-10 h-10" />
            <span className="italic text-stone-500 dark:text-stone-400">Tano</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="https://elrincondeltano.samser.co/rss.xml" className="flex items-center" target="_blank"><StaticImage src="../icons/rss-icon.svg" alt="RSS icon" className="w-4 h-4" /></a>
            <a href="resume/resume.pdf" target="_blank" className="font-semibold underline underline-offset-4">CV</a>
            <a href="mailto:franco@samser.co" className="rounded-lg border border-emerald-900 px-3 py-1.5 text-sm font-medium text-emerald-900 transition-colors hover:bg-emerald-900 hover:text-white dark:border-emerald-600 dark:text-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white">Contactame</a>
          </nav>
        </div>
        <div className="mt-8 mb-6 text-center">
          <h1 className="font-bold text-3xl md:text-4xl">El Rincón del Tano</h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">Las boludeces de un escorpiano, en voz alta.</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <div className="mb-6">
          <label htmlFor="tags" className="mr-2 text-sm text-stone-500 dark:text-stone-400">Filtrar por tag: </label>
          <select id="tags" name="tags" defaultValue="todos" onChange={(e) => setSelectedTag(e.target.value)} className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:border-stone-700 dark:bg-stone-900">
            {uniqueTagOptions.map(tagOption => <option key={tagOption} value={tagOption}>{tagOption}</option>)}
          </select>
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr">
          {filteredPosts.map(post => <PostPreview key={post.frontmatter.slug} {...post.frontmatter} />)}
        </div>
      </main>
    </div>
  )
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: exits with code 0, no error output.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.tsx
git commit -m "style: restyle index header, tag filter and grid"
```

---

### Task 3: Post preview card — clickable card, full-width image, chips

**Files:**
- Modify: `src/components/postPreview.tsx`

- [ ] **Step 1: Restyle the card**

Replace the entire file with:

```tsx
import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Post } from '../utils/types'

const PostPreview = ({ title, subtitle, tags, imgPath, slug }: Post) => {
  const featuredImg = getImage(imgPath?.childImageSharp?.gatsbyImageData) as IGatsbyImageData

  return <Link to={`/content/${slug}`} className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-stone-800 dark:bg-stone-900">
    <GatsbyImage image={featuredImg} className="aspect-[3/2] w-full" alt={title} />
    <div className="flex flex-col gap-2 p-4">
      <span className="font-semibold line-clamp-2">{title}</span>
      <p className="text-sm text-stone-500 line-clamp-2 dark:text-stone-400">{subtitle}</p>
      <div className="flex flex-row flex-wrap gap-1.5 mt-auto">
        {tags.map(tag => <span key={tag} className="text-xs rounded-full border border-stone-300 px-2 py-0.5 text-stone-600 whitespace-nowrap overflow-hidden text-ellipsis dark:border-stone-700 dark:text-stone-300">{tag}</span>)}
      </div>
    </div>
  </Link>
}

export default PostPreview;
```

Changes: root `div` → Gatsby `Link` (whole card clickable), "Leer más" button removed, image full-width with `aspect-[3/2]`, tags become neutral outline chips, title/subtitle clamped to 2 lines.

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: exits with code 0, no error output.

- [ ] **Step 3: Commit**

```bash
git add src/components/postPreview.tsx
git commit -m "style: make post card fully clickable with cleaner layout"
```

---

### Task 4: Post template — metadata header, cover image, back link

**Files:**
- Modify: `src/templates/post.tsx`

- [ ] **Step 1: Rewrite the template**

Replace the entire file with:

```tsx
import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import SEO from "../components/seo"
import Anchor from "../components/anchor"

const shortcodes = { Link, Anchor }

type Data = {
  mdx: {
    frontmatter: {
      title: string
      subtitle: string
      date: string
      tags: Array<string>
      imgPath: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
  }
}

type Children = (string | JSX.Element | JSX.Element[]);

export default function PageTemplate({ data, children }: { data: Data, children: Children }) {
  const { title, subtitle, date, tags, imgPath } = data.mdx.frontmatter
  const featuredImg = getImage(imgPath?.childImageSharp?.gatsbyImageData) as IGatsbyImageData

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link to="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">← Volver</Link>
      <header className="mt-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-lg text-stone-500 dark:text-stone-400">{subtitle}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          {date && <span>{date}</span>}
          {tags.map(tag => <span key={tag} className="text-xs rounded-full border border-stone-300 px-2 py-0.5 text-stone-600 dark:border-stone-700 dark:text-stone-300">{tag}</span>)}
        </div>
        {featuredImg && <GatsbyImage image={featuredImg} className="mt-6 w-full rounded-lg" alt={title} />}
      </header>
      <article className="post-content">
        <MDXProvider components={shortcodes}>
          {children}
        </MDXProvider>
      </article>
    </div>
  )
}

export const Head = ({ data }: { data: Data }) => <SEO title={data.mdx.frontmatter.title} />

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        date
        tags
        imgPath {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
    }
  }
`
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: exits with code 0, no error output.

- [ ] **Step 3: Commit**

```bash
git add src/templates/post.tsx
git commit -m "style: add post metadata header, cover image and back link"
```

---

### Task 5: MDX content typography (`.post-content`)

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Append the `.post-content` block to `src/styles/global.css`**

Add the following inside the existing `@layer components { }` block (after the `ul, ol` rule):

```css
  .post-content h2 {
    @apply mt-8 mb-4 text-2xl font-bold;
  }
  .post-content h3 {
    @apply mt-6 mb-3 text-xl font-semibold;
  }
  .post-content p {
    @apply mb-4 leading-relaxed;
  }
  .post-content a {
    @apply text-emerald-700 underline underline-offset-4 transition-colors hover:text-emerald-900 dark:text-emerald-500 dark:hover:text-emerald-400;
  }
  .post-content blockquote {
    @apply my-4 border-l-4 border-stone-300 pl-4 italic text-stone-600 dark:border-stone-700 dark:text-stone-300;
  }
  .post-content code {
    @apply rounded bg-stone-100 px-1.5 py-0.5 font-mono text-sm text-stone-800 dark:bg-stone-800 dark:text-stone-200;
  }
  .post-content pre {
    @apply my-4 overflow-x-auto rounded-lg bg-stone-100 p-4 font-mono text-sm dark:bg-stone-800;
  }
  .post-content pre code {
    @apply bg-transparent p-0 text-inherit;
  }
  .post-content img {
    @apply my-4 rounded-lg;
  }
  .post-content hr {
    @apply my-8 border-stone-200 dark:border-stone-800;
  }
  .post-content del {
    @apply text-stone-500 dark:text-stone-400;
  }
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: exits with code 0, no error output.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add hand-rolled typography for post content"
```

---

### Task 6: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full typecheck**

Run: `npm run typecheck`
Expected: exits with code 0, no error output.

- [ ] **Step 2: Build check (optional but recommended)**

Run: `npm run build`
Expected: completes successfully, "success Building production JavaScript and CSS bundles".

- [ ] **Step 3: Visual check (user)**

Run: `npm run develop`, open http://localhost:8000
Check:
- Index: header layout, Contactame outline button, styled select, card grid.
- Card: hover shadow, whole card links to `/content/<slug>`, tags as chips, image fills card width.
- Tag filter still filters posts.
- Post page: back link, title/subtitle/date/tags, cover image, styled headings/links/code/lists in content.
- Dark mode: switch OS to dark — backgrounds, cards, chips, and post content all adapt.

- [ ] **Step 4: Commit any fixes found during visual check**

```bash
git add -A
git commit -m "fix: address visual review findings"
```
