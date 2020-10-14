import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

const Text = styled.p`
  margin-bottom: 0;
  color: white;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
`

const HeaderPromotionBar = () => {
  const data = useStaticQuery(graphql`
    {
      prismicHeaderPromotion {
        id
        data {
          promotion_text {
            text
          }
        }
      }
    }
  `)
  return (
    <Wrapper>
      <Text>{data.prismicHeaderPromotion.data.promotion_text.text}</Text>
    </Wrapper>
  )
}

export default HeaderPromotionBar
