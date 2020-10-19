import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import createStringVariants from "../../utils/createStringVariants"
import calculateDiscount from "../../utils/calculateDiscount"
import useTagSearch from "../../hooks/useTagSearch"
import TagSearch from "../../components/tagSearch/index"
import SnipcartBtn from "../../components/snipcartBtn/index"

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

const Product = () => {
  const { tag, setTag } = useTagSearch()
  const data = useStaticQuery(graphql`
    {
      allPrismicProducts {
        edges {
          node {
            id
            uid
            data {
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
              product_size_variants {
                price
                size {
                  text
                }
              }
              stock
              product_category {
                uid
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
  `)

  return (
    <>
      <h2>
        You are browsing <u>All</u> products
      </h2>
      <p>
        We are currently selling {data.allPrismicProducts.edges.length}{" "}
        products!
      </p>
      <TagSearch tag={tag} setTag={setTag} />
      <Products>
        {data.allPrismicProducts.edges
          .filter(({ node }) => {
            if (tag === "All") {
              return node
            } else if (tag === "In Stock") {
              return node.data.stock === true
            } else {
              return node.data.product_tag === tag
            }
          })
          .map(({ node }) => {
            return (
              <Link
                to={`/${node.data.product_category.uid}/${node.uid}`}
                key={node.uid}
                style={{ textDecoration: "none" }}
              >
                <div style={{ fontFamily: "Roboto" }}>
                  <p
                    style={{
                      padding: 6,
                      backgroundColor: "#FF5678",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {node.data.product_tag}
                  </p>
                  <div style={{ position: "relative" }}>
                    {node.data.stock === false ? (
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
                      imgStyle={{ objectFit: "contain" }}
                      style={{ height: 300 }}
                      fluid={
                        node.data.body[0].items[0].gallery_image.localFile
                          .childImageSharp.fluid
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
                      {node.data.product_title.text}
                    </h3>
                    {node.data.product_discount_price && (
                      <p
                        style={{
                          marginBottom: 0,
                          color: "#C62927",
                          fontWeight: "bold",
                        }}
                      >
                        -{node.data.product_discount_price}%
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        color: `${
                          node.data.product_discount_price
                            ? "#C62927"
                            : "#1A1B1D"
                        }`,
                        textDecoration: `${
                          node.data.product_discount_price && "line-through"
                        }`,
                        marginRight: `${
                          node.data.product_discount_price && "12px"
                        }`,
                      }}
                    >
                      {node.data.product_price}€
                    </p>
                    {node.data.product_discount_price && (
                      <p style={{ color: "#1A1B1D", fontWeight: "bold" }}>
                        {calculateDiscount(
                          node.data.product_price,
                          node.data.product_discount_price
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
                      itemId={node.data.product_id}
                      itemPrice={node.data.product_price}
                      itemDiscountPrice={node.data.product_discount_price}
                      itemUrl="/"
                      itemDescription={node.data.product_description.text}
                      itemImage={
                        node.data.body[0].items[0].gallery_image.localFile
                          .childImageSharp.fluid.src
                      }
                      itemName={node.data.product_title.text}
                      customName={
                        node.data.product_size_variants.length ? "Size" : null
                      }
                      customOptions={createStringVariants(
                        node.data.product_size_variants
                      )}
                      inStock={!node.data.stock}
                    >
                      Add to Cart
                    </SnipcartBtn>
                  </div>
                  {node.data.product_size_variants.length ? (
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
    </>
  )
}

export default Product
