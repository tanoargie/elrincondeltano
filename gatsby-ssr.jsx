import * as React from "react"
import { Script } from "gatsby"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/NunitoSans-Black.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansBlack"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-BlackItalic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansBlackItalic"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-Bold.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansBold"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-BoldItalic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansBoldItalic"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-ExtraBold.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansExtraBold"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-ExtraBoldItalic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansExtraBoldItalic"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-ExtraLight.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansExtraLight"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-ExtraLightItalic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansExtraLightItalic"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-Italic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansItalic"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-Light.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansLight"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-SemiBold.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansSemiBold"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-SemiBoldItalic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansSemiBoldItalic"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-LightItalic.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansLightItalic"
    />,
    <link
      rel="preload"
      href="/fonts/NunitoSans-Regular.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="nunitoSansRegular"
    />,
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`}
      strategy="off-main-thread"
      forward={[`dataLayer.push`]}
    />,
    <Script id="gtag-config" strategy="off-main-thread" forward={[`gtag`]}>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)};
        gtag('js', new Date());
        gtag('config', ${process.env.GTAG}, { page_path: location ? location.pathname + location.search + location.hash : undefined })
      `}
    </Script>,
    <script
      key="partytown-vanilla-config"
      dangerouslySetInnerHTML={{
        __html: `partytown = {
           resolveUrl(url, location) {
              if (url.hostname.includes('google-analytics')) {
                // Use a secure connection
                if (url?.protocol === 'http:') {
                  url = new URL(url.href.replace('http', 'https'))
                }

                // Point to our proxied URL
                const proxyUrl = new URL(location.origin + '/__third-party-proxy')
                proxyUrl.searchParams.append('url', url)

                return proxyUrl
              }

              return url
           }
         }`,
      }}
    />,
  ])
}
