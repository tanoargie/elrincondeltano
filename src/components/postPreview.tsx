import * as React from "react"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Post } from '../utils/types'

const PostPreview = ({ title, subtitle, tags, imgPath, slug }: Post) => {
  const featuredImg = getImage(imgPath?.childImageSharp?.gatsbyImageData) as IGatsbyImageData

  return <div className="font-ns flex flex-col gap-4">
    <GatsbyImage image={featuredImg} className="rounded h-2/6 w-1/2" alt={title} />
    <div className="h-3/6">
      <span className="font-bold">
        {title}
      </span>
      <p className="opacity-80">{subtitle}</p>
      <div className="flex flex-row gap-2">
        {tags.map(tag => <span key={tag} className="shadow-lg text-white rounded-full bg-gray-800 border border-gray-300 px-2 overflow-hidden whitespace-nowrap text-ellipsis">{tag}</span>)}
      </div>
    </div>
    <a href={`content/${slug}`} className="flex rounded bg-emerald-900 p-4 text-white md:w-1/2 w-full text-center h-1/6 items-center justify-center">Leer más</a>
  </div>
}

export default PostPreview;
