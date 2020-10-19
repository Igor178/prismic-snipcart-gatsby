import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

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

const NoRecommendations = styled.div`
  text-align: center;
  padding: 16px;
  border: 1px solid #d1d0d1;
  border-radius: 4px;
  box-shadow: 0px 4px 40px rgba(218, 218, 218, 0.5);

  p {
    margin-bottom: 0;
  }
`

const RecommendedProducts = ({ products }) => {
  return (
    <div style={{ marginTop: 64 }}>
      <h3>Recommended Products</h3>
      {products.edges.length ? (
        <Products>
          {products.edges.map(({ node }) => {
            return (
              <Link
                to={`/${node.data.product_category.uid}/${node.uid}`}
                key={node.uid}
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
                  <h3 style={{ color: "#1A1B1D", marginTop: 16 }}>
                    {node.data.product_title.text}
                  </h3>
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
                        {node.data.product_discount_price}€
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
      ) : (
        <NoRecommendations>
          <p>We don't have any recommendations right now.</p>
        </NoRecommendations>
      )}
    </div>
  )
}

export default RecommendedProducts
