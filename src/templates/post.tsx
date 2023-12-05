import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

const shortcodes = { Link } // Provide common components here

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
    <div className="font-ns text-center">
      <h1 className="text-lg font-bold">{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </div>
  )
}

export const Head = ({ data }: { data: Data }) => <title>{data.mdx.frontmatter.title}</title>

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`
