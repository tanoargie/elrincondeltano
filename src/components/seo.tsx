import React from "react"
import { Script } from "gatsby"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

type SEOProps = {
  title?: string;
  description?: string;
  pathname?: string;
  children?: string | JSX.Element | JSX.Element[]
}

export const SEO = ({ title, description, pathname, children }: SEOProps) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`}
        strategy="off-main-thread"
      />
      <Script id="gtag-config" strategy="off-main-thread" forward={[`gtag`]}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', ${process.env.GTAG}, { page_path: location ? location.pathname + location.search + location.hash : undefined })
        `}
      </Script>
      <html lang="es" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      {children}
    </>
  )
}
