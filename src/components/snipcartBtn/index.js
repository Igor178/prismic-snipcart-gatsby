import React from "react"
import styled from "styled-components"

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 12px;
  background-color: #581a45;
  color: white;
  border-radius: 4px;
  border: none;
`

const SnipcartBtn = ({
  itemId,
  itemPrice,
  itemDiscountPrice,
  itemUrl,
  itemDescription,
  itemImage,
  itemName,
}) => {
  return (
    <Button
      className="snipcart-add-item"
      data-item-id={itemId}
      data-item-price={itemDiscountPrice ? itemDiscountPrice : itemPrice}
      data-item-url={itemUrl}
      data-item-description={itemDescription}
      data-item-image={itemImage}
      data-item-name={itemName}
    >
      Add to Cart
    </Button>
  )
}

export default SnipcartBtn
