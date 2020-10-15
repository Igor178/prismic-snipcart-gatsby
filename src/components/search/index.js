import React, { useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import CloseDropdownOnOutsideClick from "./closeDropdownOnOutsideClick"

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  max-width: 470px;
`

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;

  ::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
`

const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 2px;
  z-index: 3;
  display: ${props => (props.visible ? "unset" : "none")};
`

const DropdownItem = styled.div`
  padding: 16px 8px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
`

const Search = () => {
  const [dropdown, setDropdown] = useState(true)
  const data = useStaticQuery(graphql`
    {
      allPrismicProducts {
        edges {
          node {
            uid
            data {
              product_title {
                text
              }
              product_price
              product_discount_price
              product_category {
                uid
                document {
                  ... on PrismicCategories {
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
          }
        }
      }
    }
  `)

  const [query, setQuery] = useState("")

  return (
    <Wrapper>
      <div style={{ flex: 1 }}>
        <CloseDropdownOnOutsideClick setDropdown={setDropdown}>
          <Input
            placeholder="Search products..."
            value={query}
            onFocus={e => setDropdown(true)}
            onChange={e => {
              setQuery(e.target.value)
            }}
          />
          <div style={{ position: "relative" }}>
            <Dropdown visible={dropdown}>
              {query &&
                data.allPrismicProducts.edges
                  .filter(({ node }) =>
                    node.data.product_title.text
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  )
                  .map(({ node }) => {
                    return (
                      <Link
                        key={node.uid}
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/${node.data.product_category.document.uid}/${node.uid}`}
                      >
                        <DropdownItem>
                          <p style={{ marginBottom: 0 }}>
                            {node.data.product_title.text}
                          </p>
                          <div style={{ display: "flex" }}>
                            <p
                              style={{
                                color: `${
                                  node.data.product_discount_price
                                    ? "#C62927"
                                    : "#1A1B1D"
                                }`,
                                textDecoration: `${
                                  node.data.product_discount_price &&
                                  "line-through"
                                }`,
                                marginRight: `${
                                  node.data.product_discount_price && "12px"
                                }`,
                                marginBottom: 0,
                              }}
                            >
                              {node.data.product_price}€
                            </p>
                            {node.data.product_discount_price && (
                              <p
                                style={{
                                  color: "#1A1B1D",
                                  fontWeight: "bold",
                                  marginBottom: 0,
                                }}
                              >
                                {node.data.product_discount_price}€
                              </p>
                            )}
                          </div>
                        </DropdownItem>
                      </Link>
                    )
                  })}
            </Dropdown>
          </div>
        </CloseDropdownOnOutsideClick>
      </div>
    </Wrapper>
  )
}

export default Search
