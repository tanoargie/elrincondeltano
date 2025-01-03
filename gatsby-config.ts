import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `elrincondeltano`,
    siteUrl: `https://www.elrincondeltano.com`,
    description: `Blog Personal del Tano`,
    twitterUsername: `@tanoargie`,
    image: `/images/logo.svg`,
  },
  partytownProxiedURLs: [
    `https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`,
  ],
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-mdx",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "content",
        "path": `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'El Rincon del Tano',
        short_name: 'ERDT',
        start_url: '/',
        display: 'standalone',
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://elrincondeltano.samser.co`,
      },
    },
  ]
};

export default config;
