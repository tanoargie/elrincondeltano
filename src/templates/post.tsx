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
      slug: string
      subtitle: string
      date: string
      tags: Array<string>
      imgPath: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
    fields: {
      timeToRead: number | null
    }
  }
}

type PageContext = {
  newer: { slug: string; title: string } | null
  older: { slug: string; title: string } | null
}

type Children = (string | JSX.Element | JSX.Element[]);

export default function PageTemplate({ data, children, pageContext }: { data: Data, children: Children, pageContext: PageContext }) {
  const { title, subtitle, date, tags, imgPath } = data.mdx.frontmatter
  const featuredImg = getImage(imgPath?.childImageSharp?.gatsbyImageData) as IGatsbyImageData
  const timeToRead = data.mdx.fields?.timeToRead

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link to="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">← Volver</Link>
      <header className="mt-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-lg text-stone-500 dark:text-stone-400">{subtitle}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
          {date && <span>{date}</span>}
          {timeToRead != null && <span>{timeToRead} min de lectura</span>}
          {tags.map(tag => <span key={tag} className="text-xs rounded-full border border-stone-300 px-2 py-0.5 text-stone-600 dark:border-stone-700 dark:text-stone-300">{tag}</span>)}
        </div>
        {featuredImg && <GatsbyImage image={featuredImg} className="mt-6 w-full rounded-lg" alt={title} />}
      </header>
      <article className="post-content">
        <MDXProvider components={shortcodes}>
          {children}
        </MDXProvider>
      </article>
      <nav className="mt-10 flex items-start justify-between gap-4 border-t border-stone-200 pt-6 dark:border-stone-800">
        {pageContext.older ? (
          <Link to={`/content/${pageContext.older.slug}`} className="group flex-1">
            <span className="block text-xs text-stone-500 dark:text-stone-400">← Anterior</span>
            <span className="font-medium text-stone-700 transition-colors group-hover:text-emerald-700 dark:text-stone-200 dark:group-hover:text-emerald-400">{pageContext.older.title}</span>
          </Link>
        ) : <span className="flex-1" />}
        {pageContext.newer ? (
          <Link to={`/content/${pageContext.newer.slug}`} className="group flex-1 text-right">
            <span className="block text-xs text-stone-500 dark:text-stone-400">Siguiente →</span>
            <span className="font-medium text-stone-700 transition-colors group-hover:text-emerald-700 dark:text-stone-200 dark:group-hover:text-emerald-400">{pageContext.newer.title}</span>
          </Link>
        ) : <span className="flex-1" />}
      </nav>
    </div>
  )
}

export const Head = ({ data }: { data: Data }) => (
  <SEO
    title={data.mdx.frontmatter.title}
    description={data.mdx.frontmatter.subtitle}
    pathname={`/content/${data.mdx.frontmatter.slug}`}
    type="article"
  />
)

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        slug
        subtitle
        date
        tags
        imgPath {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
      }
      fields {
        timeToRead
      }
    }
  }
`
