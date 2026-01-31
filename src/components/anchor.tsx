import React from "react"

type AnchorProps = {
  href: string,
  text: string
}

export default function Anchor({ href, text }: AnchorProps) {
  return (
    <a href={href} target="_blank" className="underline underline-offset-7 decoration-blue-400 italic text-blue-500">{text}</a>
  )
}
