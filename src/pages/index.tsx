import * as React from "react"
import PostPreview from '../components/postPreview'
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"

const IndexPage: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="font-ns">
      <header className="text-center mb-8">
        <div className="flex flex-row place-content-between">
          <div className="flex items-center">
            <img src="/images/logo.svg" className="w-12 h-12 m-4" />
            <span className="italic">Tano Serio</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="resume/resume.pdf" target="_blank" className="font-bold underline">Curriculum</a>
            <a href="mailto:franco@samser.co" className="flex rounded bg-emerald-500 text-white p-4">Contactame</a>
          </div>
        </div>
        <h1 className="font-bold">
          El Rincón del Tano
        </h1>
        <h3>Las boludeces de un escorpiano, pero en voz alta...</h3>
      </header>
      <main>
        <div></div>
        <div className="grid gap-8 grid-cols-2 grid-rows-2 m-4 xl:grid-cols-5 xl:grid-rows-5 lg:grid-cols-4 lg:grid-rows-4 md:grid-cols-3 md:grid-rows-3">
          {data.allMdx.nodes.map(post => <PostPreview key={post.frontmatter.slug} {...post.frontmatter} />)}
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
          imgPath
          tags
        }
      }
    }
  }
`
