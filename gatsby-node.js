const path = require("path")

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const getProducts = makeRequest(
    graphql,
    `
    {
      allPrismicProducts {
        edges {
          node {
            uid
            data {
              product_category {
                uid
              }
            }
          }
        }
      }
    }
  `
  ).then(result => {
    const products = result.data.allPrismicProducts.edges
    products.forEach(({ node }, index) => {
      createPage({
        path: `/${node.data.product_category.uid}/${node.uid}`,
        component: path.resolve(`./src/templates/product-template.js`),
        context: { uid: node.uid, category: node.data.product_category.uid },
      })
    })
  })

  const getCategories = makeRequest(
    graphql,
    `
    {   
      allPrismicCategories {
      edges {
        node {
            uid
          }
        }
      }
    }
  `
  ).then(result => {
    const categories = result.data.allPrismicCategories.edges
    categories.forEach(({ node }, index) => {
      createPage({
        path: `/${node.uid}`,
        component: path.resolve(`./src/templates/category-template.js`),
        context: { uid: node.uid },
      })
    })
  })

  return Promise.all([getProducts, getCategories])
}
