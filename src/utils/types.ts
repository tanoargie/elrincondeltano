import { IGatsbyImageData } from "gatsby-plugin-image"

type Image = {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}

type Post = {
  title: string,
  subtitle: string,
  tags: Array<string>,
  imgPath: Image,
  slug: string
}

export { Post, Image }
