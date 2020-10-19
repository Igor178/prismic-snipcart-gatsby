import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import useTagSearch from "../hooks/useTagSearch"
import createStringVariants from "../utils/createStringVariants"
import calculateDiscount from "../utils/calculateDiscount"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagSearch from "../components/tagSearch/index"
import SnipcartBtn from "../components/snipcartBtn/index"

const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
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
      <TagSearch tag={tag} setTag={setTag} />
      <Products>
        {data.prismicCategories.data.body[0].items
          .filter(({ product }) => {
            if (tag === "All") {
              return product
            } else if (tag === "In Stock") {
              return product.document.data.stock === true
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
                      style={{ marginBottom: 16, height: 300 }}
                      imgStyle={{ objectFit: "contain" }}
                      fluid={
                        product.document.data.body[0].items[0].gallery_image
                          .localFile.childImageSharp.fluid
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 style={{ color: "#1A1B1D", marginTop: 16 }}>
                      {product.document.data.product_title.text}
                    </h3>
                    {product.document.data.product_discount_price && (
                      <p
                        style={{
                          marginBottom: 0,
                          color: "#C62927",
                          fontWeight: "bold",
                        }}
                      >
                        -{product.document.data.product_discount_price}%
                      </p>
                    )}
                  </div>
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
                        {calculateDiscount(
                          product.document.data.product_price,
                          product.document.data.product_discount_price
                        )}
                        €
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto  auto",
                      alignItems: "center",
                      gridGap: 16,
                    }}
                  >
                    <button
                      style={{
                        cursor: "pointer",
                        padding: 12,
                        backgroundColor: "#893d70",
                        color: "white",
                        borderRadius: 4,
                        border: "none",
                      }}
                    >
                      Read More
                    </button>

                    <SnipcartBtn
                      style={{
                        cursor: "pointer",
                        padding: 12,
                        backgroundColor: "#581A45",
                        color: "white",
                        borderRadius: 4,
                        border: "none",
                      }}
                      itemId={product.document.data.product_id}
                      itemPrice={product.document.data.product_price}
                      itemDiscountPrice={
                        product.document.data.product_discount_price
                      }
                      itemUrl="/"
                      itemDescription={
                        product.document.data.product_description.text
                      }
                      itemImage={
                        product.document.data.body[0].items[0].gallery_image
                          .localFile.childImageSharp.fluid.src
                      }
                      itemName={product.document.data.product_title.text}
                      customName={
                        product.document.data.product_size_variants.length
                          ? "Size"
                          : null
                      }
                      customOptions={createStringVariants(
                        product.document.data.product_size_variants
                      )}
                      inStock={!product.document.data.stock}
                    >
                      Add to Cart
                    </SnipcartBtn>
                  </div>
                  {product.document.data.product_size_variants.length ? (
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        marginTop: 8,
                        marginBottom: 0,
                        color: "black",
                      }}
                    >
                      This product has multiple variants.
                    </p>
                  ) : null}
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
                      product_description {
                        text
                      }
                      product_title {
                        text
                      }
                      product_size_variants {
                        price
                        size {
                          text
                        }
                      }
                      body {
                        __typename
                        ... on PrismicProductsBodyImageGallery {
                          items {
                            gallery_image {
                              alt
                              localFile {
                                childImageSharp {
                                  fluid(maxWidth: 300) {
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
