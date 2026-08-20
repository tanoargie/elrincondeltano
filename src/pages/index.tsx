import React, { useState, useMemo } from "react"
import PostPreview from '../components/postPreview'
import type { HeadFC } from "gatsby"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import{ Post } from '../utils/types'
import SEO from "../components/seo"

type PostData = {
  frontmatter: Post
}

type Data = {
  data: {
    allMdx: {
      nodes: Array<PostData>
    }
  }
}

const filterPosts = (posts: Array<PostData>, selectedTag: string) => {
  if (selectedTag !== 'todos') {
    return posts.filter(post => post.frontmatter.tags.includes(selectedTag))
  }
  return posts;
}

const IndexPage = ({ data }: Data) => {
  const posts = data.allMdx.nodes;
  const tagOptions = posts.map((post: PostData) => post.frontmatter.tags)
  const uniqueTagOptions = ['todos'].concat([...new Set<string>(tagOptions.flat(1))]);
  const [selectedTag, setSelectedTag] = useState('todos')
  const filteredPosts = useMemo(() => filterPosts(posts, selectedTag), [posts, selectedTag])
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
}

export default IndexPage

export const Head: HeadFC = () => <SEO title="El Rincón del Tano" />

export const query = graphql`
  query {
    allMdx {
      nodes {
        id
        frontmatter {
          slug
          subtitle
          title
          imgPath {
            childImageSharp {
              gatsbyImageData(width: 250)
            }
          }
          tags
        }
      }
    }
  }
`
