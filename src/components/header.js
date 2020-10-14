import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context"
import HeaderPromotionBar from "./headerPromotionBar/index"

const Header = ({ siteTitle }) => {
  const { state } = useContext(SnipcartContext)
  const data = useStaticQuery(graphql`
    {
      allPrismicCategories {
        edges {
          node {
            uid
            data {
              category_name {
                text
              }
            }
          }
        }
      }
    }
  `)

  return (
    <header
      style={{
        background: `#A170D5`,
        marginBottom: `1.45rem`,
      }}
    >
      <HeaderPromotionBar />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0, marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
          }}
        >
          <div>
            {data.allPrismicCategories.edges.map(({ node }) => (
              <Link
                key={node.uid}
                style={{ color: "white", marginRight: 24 }}
                to={`/${node.uid}`}
              >
                {node.data.category_name.text}
              </Link>
            ))}
          </div>
          <div>
            <span style={{ color: "white", marginRight: 16 }}>
              {state.cartTotal}€
            </span>
            <button
              className="snipcart-checkout"
              style={{
                padding: "6px 16px",
                cursor: "pointer",
                backgroundColor: "#ff5678",
                color: "white",
                borderRadius: 4,
                border: "none",
              }}
            >
              CART
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
