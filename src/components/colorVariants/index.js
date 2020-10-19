import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const Color = styled.div`
  height: 32px;
  width: 32px;
  background-color: ${props => props.bg};
  margin-right: 8px;
  border-radius: 50px;
  border: 2px solid ${props => (props.active ? "black" : "#d1d0d1")};
  box-shadow: 0px 4px 40px rgba(218, 218, 218, 0.5);
`

const ColorVariants = ({ variants, pathname }) => {
  return (
    <Wrapper>
      {variants.map(({ color, product_link }) => {
        return (
          <Link to={`/${product_link.text}`}>
            <Color bg={color} active={`/${product_link.text}` === pathname} />
          </Link>
        )
      })}
    </Wrapper>
  )
}

export default ColorVariants
