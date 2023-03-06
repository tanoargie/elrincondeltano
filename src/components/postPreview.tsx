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
    <img src={`images/${imgPath}`} className="rounded h-1/2 w-1/2" />
    <div className="h-2/6">
      <span className="font-bold">
        {title}
      </span>
      <p className="opacity-50">{subtitle}</p>
    </div>
    <a href={`content/${slug}`} className="flex rounded bg-emerald-500 p-4 text-white md:w-1/2 w-full text-center h-1/6 items-center justify-center">Leer más</a>
  </div>
)

export default PostPreview;
