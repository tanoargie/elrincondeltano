import * as React from "react"

type PostPreviewProps = {
  title: string,
  subtitle: string,
  tags: Array<string>,
  imgPath: string,
  slug: string
}

const PostPreview = ({ title, subtitle, tags, imgPath, slug }: PostPreviewProps) => (
  <div className="font-ns flex flex-col gap-4">
    <img src={`images/${imgPath}`} className="rounded" />
    <span className="font-bold">
      {title}
    </span>
    <p className="opacity-50">{subtitle}</p>
    <a href={`content/${slug}`} className="rounded bg-emerald-500 p-4 text-white md:w-1/2 w-full text-center">Leer más</a>
  </div>
)

export default PostPreview;
