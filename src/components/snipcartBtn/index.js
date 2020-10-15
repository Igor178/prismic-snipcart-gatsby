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
  customName,
  customOptions,
  customValue,
}) => {
  return (
    <>
      <Button
        className="snipcart-add-item"
        data-item-id={itemId}
        data-item-price={itemDiscountPrice ? itemDiscountPrice : itemPrice}
        data-item-url={itemUrl}
        data-item-description={itemDescription}
        data-item-image={itemImage}
        data-item-name={itemName}
        data-item-custom1-name={customName}
        data-item-custom1-options={customOptions}
        data-item-custom1-value={customValue}
      >
        Add to Cart
      </Button>
    </>
  )
}

export default SnipcartBtn
