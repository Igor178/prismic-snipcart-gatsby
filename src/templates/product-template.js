import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import createStringVariants from "../utils/createStringVariants"
import updatePrice from "../utils/updatePrice"
import calculateDiscount from "../utils/calculateDiscount"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SnipcartBtn from "../components/snipcartBtn/index"
import QtyBtn from "../components/qtyBtn/index"
import RecommendedProducts from "../components/recommendedProducts/index"
import Breadcrumbs from "../components/breadcrumb/index"
import ColorVariants from "../components/colorVariants/index"

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-bottom: 24px;

    .thumbnail-previews {
      order: 1;
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }
  }
`

const ThumbnailWrapper = styled.div`
  border: ${props => (props.active ? "1px solid #D1D0D1" : "1px solid white")};

  box-shadow: ${props =>
    props.active ? "0px 4px 40px rgba(218, 218, 218, 0.5)" : null};

  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 4px;

  @media (max-width: 768px) {
    margin-right: 16px;
    margin-bottom: 0;
  }
`

const Thumbnail = styled(Img)`
  width: 50px;
  height: 50px;
  margin-bottom: 0;
  display: block;
`

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProductTemplate = ({ data, location }) => {
  const [active, setActive] = useState(0)
  const [customValue, setCustomValue] = useState(
    data.prismicProducts.data.product_size_variants[0]?.size.text
  )
  const [qty, setQty] = useState(1)

  return (
    <Layout>
      <SEO title={data.prismicProducts.data.product_title.text} />

      <ProductGrid>
        <Thumbnails>
          <div className="thumbnail-previews">
            {data.prismicProducts.data.body[0].items.map((item, index) => {
              return (
                <ThumbnailWrapper
                  active={index === active}
                  onClick={e => {
                    setActive(index)
                  }}
                  key={index}
                >
                  <Thumbnail
                    fixed={item.gallery_image.localFile.childImageSharp.fixed}
                  />
                </ThumbnailWrapper>
              )
            })}
          </div>
          <div>
            <Img
              imgStyle={{ objectFit: "contain" }}
              style={{ height: 600 }}
              fluid={
                data.prismicProducts.data.body[0].items[active].gallery_image
                  .localFile.childImageSharp.fluid
              }
            />
          </div>
        </Thumbnails>
        <div style={{ marginBottom: 24, fontFamily: "Roboto" }}>
          <p
            style={{
              padding: 6,
              backgroundColor: "#FF5678",
              color: "white",
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            {data.prismicProducts.data.product_tag}
          </p>
          <Breadcrumbs pathname={location.pathname} />
          <Link
            to={`/${data.prismicProducts.data.product_category.uid}`}
            style={{
              color: "inherit",

              textDecoration: "none",
              textTransform: "uppercase",
              fontSize: 14,
            }}
          >
            -{" "}
            {
              data.prismicProducts.data.product_category.document.data
                .category_name.text
            }
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 16,
              marginBottom: 24,
            }}
          >
            <h2 style={{ color: "#1A1B1D", marginBottom: 0 }}>
              {data.prismicProducts.data.product_title.text}
            </h2>
            {data.prismicProducts.data.product_discount_price && (
              <p
                style={{
                  marginBottom: 0,
                  color: "#C62927",
                  fontWeight: "bold",
                }}
              >
                -{data.prismicProducts.data.product_discount_price}%
              </p>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                color: `${
                  data.prismicProducts.data.product_discount_price
                    ? "#C62927"
                    : "#1A1B1D"
                }`,
                textDecoration: `${
                  data.prismicProducts.data.product_discount_price &&
                  "line-through"
                }`,
                marginRight: `${
                  data.prismicProducts.data.product_discount_price && "12px"
                }`,
              }}
            >
              {data.prismicProducts.data.product_size_variants.length
                ? updatePrice(
                    data.prismicProducts.data.product_price,
                    data.prismicProducts.data.product_size_variants,
                    customValue
                  )
                : data.prismicProducts.data.product_price}
              €
            </p>
            {data.prismicProducts.data.product_discount_price && (
              <p style={{ color: "#1A1B1D", fontWeight: "bold" }}>
                {data.prismicProducts.data.product_size_variants.length
                  ? calculateDiscount(
                      updatePrice(
                        data.prismicProducts.data.product_price,
                        data.prismicProducts.data.product_size_variants,
                        customValue
                      ),
                      data.prismicProducts.data.product_discount_price
                    )
                  : calculateDiscount(
                      data.prismicProducts.data.product_price,
                      data.prismicProducts.data.product_discount_price
                    )}
                €
              </p>
            )}
          </div>
          {data.prismicProducts.data.product_color_variants.length ? (
            <ColorVariants
              variants={data.prismicProducts.data.product_color_variants}
              pathname={location.pathname}
            />
          ) : null}

          {data.prismicProducts.data.product_size_variants.length ? (
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="size" style={{ fontSize: 14 }}>
                Size
              </label>
              <br />
              <select
                name="size"
                id="size"
                style={{ padding: 8, width: "100%" }}
                value={customValue}
                onChange={e => setCustomValue(e.target.value)}
              >
                {data.prismicProducts.data.product_size_variants.map(
                  variant => {
                    return (
                      <option value={variant.size.text} key={variant.size.text}>
                        {variant.size.text}
                      </option>
                    )
                  }
                )}
              </select>
            </div>
          ) : null}

          <QtyBtn qty={qty} setQty={setQty} />
          <p>{data.prismicProducts.data.product_description.text}</p>
          {data.prismicProducts.data.stock === false ? (
            <p
              style={{
                color: "#B93636",
                textAlign: "center",
                backgroundColor: "#FFD6D6",
                padding: 8,
                borderRadius: 4,
              }}
            >
              Out of stock
            </p>
          ) : (
            <SnipcartBtn
              itemId={data.prismicProducts.data.product_id}
              itemPrice={data.prismicProducts.data.product_price}
              itemDiscountPrice={
                data.prismicProducts.data.product_discount_price
              }
              itemUrl={`/${data.prismicProducts.data.product_category.uid}/${data.prismicProducts.uid}`}
              itemDescription={
                data.prismicProducts.data.product_description.text
              }
              itemImage={
                data.prismicProducts.data.body[0].items[0].gallery_image
                  .localFile.childImageSharp.fluid.src
              }
              itemName={data.prismicProducts.data.product_title.text}
              customName={
                data.prismicProducts.data.product_size_variants.length
                  ? "Size"
                  : null
              }
              customOptions={createStringVariants(
                data.prismicProducts.data.product_size_variants,
                data.prismicProducts.data.product_price,
                data.prismicProducts.data.product_discount_price
              )}
              customValue={customValue}
              qty={qty}
            >
              Add to Cart
            </SnipcartBtn>
          )}

          <ul style={{ marginTop: 16 }}>
            <li>Free Return</li>
            <li>Secure Payments</li>
            <li>Free Shipping</li>
          </ul>
        </div>
      </ProductGrid>
      <RecommendedProducts products={data.allPrismicProducts} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($uid: String, $category: String) {
    prismicProducts(uid: { eq: $uid }) {
      id
      uid
      data {
        stock
        product_title {
          text
        }
        product_description {
          text
        }
        product_price
        product_discount_price
        product_size_variants {
          price
          size {
            text
          }
        }
        product_color_variants {
          color
          product_link {
            text
          }
        }
        product_category {
          uid
          document {
            ... on PrismicCategories {
              data {
                category_name {
                  text
                }
              }
            }
          }
        }
        product_tag
        product_id
        body {
          __typename
          ... on PrismicProductsBodyImageGallery {
            items {
              gallery_image {
                alt
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 350) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                  childImageSharp {
                    fixed(width: 50) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allPrismicProducts(
      filter: {
        data: { product_category: { uid: { eq: $category } } }
        uid: { ne: $uid }
      }
    ) {
      edges {
        node {
          id
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
            product_category {
              id
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
`

export default ProductTemplate
