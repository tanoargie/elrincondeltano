import React from "react"

type AnchorProps = {
  href: string,
  text: string
}

export default function Anchor({ href, text }: AnchorProps) {
  return (
    <a href={href} target="_blank" className="italic">{text}</a>
  )
}
