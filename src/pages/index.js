import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Product from "../components/product/index"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Product />
  </Layout>
)

export default IndexPage
