import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Post } from '../utils/types'

const PostPreview = ({ title, subtitle, tags, imgPath, slug }: Post) => {
  const featuredImg = getImage(imgPath?.childImageSharp?.gatsbyImageData) as IGatsbyImageData

  return <Link to={`/content/${slug}`} className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-stone-800 dark:bg-stone-900">
    <GatsbyImage image={featuredImg} className="aspect-[3/2] w-full" alt="" />
    <div className="flex flex-col gap-2 p-4 flex-1">
      <span className="font-semibold line-clamp-2">{title}</span>
      <p className="text-sm text-stone-500 line-clamp-2 dark:text-stone-400">{subtitle}</p>
      <div className="flex flex-row flex-wrap gap-1.5 mt-auto">
        {tags.map(tag => <span key={tag} className="text-xs rounded-full border border-stone-300 px-2 py-0.5 text-stone-600 whitespace-nowrap overflow-hidden text-ellipsis dark:border-stone-700 dark:text-stone-300">{tag}</span>)}
      </div>
    </div>
  </Link>
}

export default PostPreview;
