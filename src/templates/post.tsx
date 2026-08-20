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
