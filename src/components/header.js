import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context"
import HeaderPromotionBar from "./headerPromotionBar/index"
import Search from "./search/index"

const Navigation = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  grid-gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;

  a {
    color: white;
    text-decoration: none;
    padding: 12px;
  }
`

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
          maxWidth: 1158,
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
        <Search />
        <Navigation>
          <Menu>
            <Link to="/">Home</Link>
            {data.allPrismicCategories.edges.map(({ node }) => (
              <Link key={node.uid} to={`/${node.uid}`}>
                {node.data.category_name.text}
              </Link>
            ))}
          </Menu>
          <div>
            <span style={{ color: "white", marginRight: 16 }}>
              {state.cartQuantity} Items
            </span>
            <button
              className="snipcart-customer-signin"
              style={{
                padding: "6px 16px",
                cursor: "pointer",
                backgroundColor: "#ff5678",
                color: "white",
                borderRadius: 4,
                border: "none",
                marginRight: 16,
              }}
            >
              {state.userStatus === "SignedOut" ? "Login" : "My Account"}
            </button>
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
              Cart
            </button>
          </div>
        </Navigation>
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
