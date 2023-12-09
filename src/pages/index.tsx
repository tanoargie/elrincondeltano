import React, { useState, useMemo } from "react"
import PostPreview from '../components/postPreview'
import type { HeadFC } from "gatsby"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Post } from '../utils/types'

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
    <div className="font-ns">
      <header className="text-center mb-4">
        <div className="flex flex-row place-content-between">
          <div className="flex items-center">
            <StaticImage src="../images/logo.svg" alt="Samser Logo" className="w-12 h-12 mt-4 mb-4 ml-4 mr-1" />
            <span className="italic">Tano Serio</span>
          </div>
          <div className="flex items-center gap-4 m-4">
            <a href="resume/resume.pdf" target="_blank" className="font-bold underline">Curriculum</a>
            <a href="mailto:franco@samser.co" className="flex rounded bg-emerald-900 text-white p-4">Contactame</a>
          </div>
        </div>
        <h1 className="font-bold">
          El Rincón del Tano
        </h1>
        <h3>Las boludeces de un escorpiano, en voz alta.</h3>
      </header>
      <main>
        <div className="mx-4">
          <span>Filtrar por tag: </span>
          <select id="tags-select" name="tags" defaultValue="todos" onChange={(e) => setSelectedTag(e.target.value)}>
            {uniqueTagOptions.map(tagOption => <option key={tagOption} value={tagOption}>{tagOption}</option>)}
          </select>
        </div>
        <div className="grid gap-8 grid-cols-2 grid-rows-2 m-4 xl:grid-cols-5 xl:grid-rows-5 lg:grid-cols-4 lg:grid-rows-4 md:grid-cols-3 md:grid-rows-3">
          {filteredPosts.map(post => <PostPreview key={post.frontmatter.slug} {...post.frontmatter} />)}
        </div>
      </main>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>El Rincon del Tano</title>

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
