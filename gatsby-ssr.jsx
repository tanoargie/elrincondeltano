import * as React from "react"
import { Partytown } from '@builder.io/partytown/react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <Partytown key="partytown" forward={['gtag', 'dataLayer.push']} />,
    <script key="google-analytics" type="text/partytown" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`} />,
    <script
      key="google-analytics-config"
      type="text/partytown"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(){ window.dataLayer.push(arguments);}
        gtag('js', new Date()); 
        gtag('config', '${process.env.GTAG}', { send_page_view: false })`
      }}
    />
  ])
}
