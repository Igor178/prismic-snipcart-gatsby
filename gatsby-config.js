module.exports = {
  siteMetadata: {
    title: `Prismic & Snipcart`,
    description: `Prismic and Snipcart demo store example.`,
    author: `@igordumencic`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `test-repo-example`,
        accessToken: `MC5YNFZUeUJFQUFDWUFHMkpJ.FBBs77-9eR5S77-9NO-_vQMuPkrvv71977-977-9fWM4Wu-_ve-_ve-_vTEjXyM4LSM`,
        schemas: {
          products: require("./src/schemas/products.json"),
          categories: require("./src/schemas/categories.json"),
          header_promotion: require("./src/schemas/header_promotion.json"),
        },
        shouldDownloadImage: ({ node, key, value }) => {
          return true
        },
      },
    },
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
        version: "3.0.19",
        publicApiKey:
          "NTVmODk3ODktODIxMi00YzBkLTg1ZTItYzYzOGJhMjRhOGU4NjM2ODYzNjI1NzAwNDI5ODQy",
        defaultLang: "en",
        currency: "eur",
        openCartOnAdd: true,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
