import * as React from "react"

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
    />
  ])
}