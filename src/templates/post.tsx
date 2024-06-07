import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import SEO from "../components/seo"
import Anchor from "../components/anchor"

const shortcodes = { Link, Anchor } // Provide common components here

type Data = {
  mdx: {
    frontmatter: {
      title: string
    }
  }
}

type Children = (string | JSX.Element | JSX.Element[]);

export default function PageTemplate({ data, children }: { data: Data, children: Children }) {
  return (
    <div className="font-ns m-4">
      <h1 className="text-xl font-bold">{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </div>
  )
}

export const Head = ({ data }: { data: Data }) => <SEO title={data.mdx.frontmatter.title} />

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
