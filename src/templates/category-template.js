import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import useTagSearch from "../hooks/useTagSearch"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`

const CategoryTemplates = ({ data }) => {
  const { tag, setTag } = useTagSearch()

  return (
    <Layout>
      <SEO title={data.prismicCategories.data.category_name.text} />
      <h2>
        You are browsing <u>{data.prismicCategories.data.category_name.text}</u>
      </h2>
      <p>
        We are currently selling{" "}
        {data.prismicCategories.data.body[0].items.length}{" "}
        {data.prismicCategories.data.category_name.text}.
      </p>
      <div style={{ marginBottom: 24 }}>
        <label htmlFor="All" style={{ cursor: "pointer" }}>
          <input
            type="radio"
            id="All"
            name="All"
            value="All"
            onChange={e => setTag(e.target.value)}
            checked={tag === "All"}
            style={{ marginRight: 8 }}
          />
          <span style={{ marginRight: 24 }}>All Products</span>
        </label>
        <label htmlFor="new" style={{ cursor: "pointer" }}>
          <input
            type="radio"
            id="new"
            name="new"
            value="New"
            onChange={e => setTag(e.target.value)}
            checked={tag === "New"}
            style={{ marginRight: 8 }}
          />
          <span style={{ marginRight: 24 }}>New Products</span>
        </label>
        <label htmlFor="On Sale" style={{ cursor: "pointer" }}>
          <input
            type="radio"
            id="On Sale"
            name="On Sale"
            value="On Sale"
            onChange={e => setTag(e.target.value)}
            checked={tag === "On Sale"}
            style={{ marginRight: 8 }}
          />
          <span style={{ marginRight: 24 }}>On Sale</span>
        </label>
        <label htmlFor="Best Seller" style={{ cursor: "pointer" }}>
          <input
            type="radio"
            id="Best Seller"
            name="Best Seller"
            value="Best Seller"
            onChange={e => setTag(e.target.value)}
            checked={tag === "Best Seller"}
            style={{ marginRight: 8 }}
          />
          <span>Best Seller</span>
        </label>
      </div>
      <Products>
        {data.prismicCategories.data.body[0].items
          .filter(({ product }) => {
            if (tag === "All") {
              return product
            } else {
              return product.document.data.product_tag === tag
            }
          })
          .map(({ product }) => {
            return (
              <Link
                to={`/${data.prismicCategories.uid}/${product.document.uid}`}
                key={product.document.uid}
                style={{ textDecoration: "none" }}
              >
                <div style={{ marginBottom: 24, fontFamily: "Roboto" }}>
                  <p
                    style={{
                      padding: 6,
                      backgroundColor: "#FF5678",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {product.document.data.product_tag}
                  </p>
                  <div style={{ position: "relative" }}>
                    {product.document.data.stock === false ? (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          zIndex: 2,
                        }}
                      >
                        <p
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: "100%",
                            transform: "translate(-50%, 0)",
                            color: "#B93636",
                            textAlign: "center",
                            backgroundColor: "#FFD6D6",
                            padding: 8,
                            borderRadius: 4,
                          }}
                        >
                          Out of stock
                        </p>
                      </div>
                    ) : null}
                    <Img
                      style={{ marginBottom: 16 }}
                      fluid={
                        product.document.data.body[0].items[0].gallery_image
                          .localFile.childImageSharp.fluid
                      }
                    />
                  </div>
                  <h3 style={{ color: "#1A1B1D", marginTop: 16 }}>
                    {product.document.data.product_title.text}
                  </h3>
                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        color: `${
                          product.document.data.product_discount_price
                            ? "#C62927"
                            : "#1A1B1D"
                        }`,
                        textDecoration: `${
                          product.document.data.product_discount_price &&
                          "line-through"
                        }`,
                        marginRight: `${
                          product.document.data.product_discount_price && "12px"
                        }`,
                      }}
                    >
                      {product.document.data.product_price}€
                    </p>
                    {product.document.data.product_discount_price && (
                      <p style={{ color: "#1A1B1D", fontWeight: "bold" }}>
                        {product.document.data.product_discount_price}€
                      </p>
                    )}
                  </div>
                  <button
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      padding: 12,
                      backgroundColor: "#581A45",
                      color: "white",
                      borderRadius: 4,
                      border: "none",
                    }}
                  >
                    Read More
                  </button>
                </div>
              </Link>
            )
          })}
      </Products>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($uid: String) {
    prismicCategories(uid: { eq: $uid }) {
      uid
      data {
        category_name {
          text
        }
        body {
          ... on PrismicCategoriesBodyProducts {
            items {
              product {
                document {
                  ... on PrismicProducts {
                    uid
                    data {
                      stock
                      product_price
                      product_discount_price
                      product_tag
                      product_id
                      product_title {
                        text
                      }
                      product_title {
                        text
                      }
                      body {
                        __typename
                        ... on PrismicProductsBodyImageGallery {
                          items {
                            gallery_image {
                              alt
                              localFile {
                                childImageSharp {
                                  fluid(maxWidth: 300, maxHeight: 220) {
                                    ...GatsbyImageSharpFluid
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default CategoryTemplates
