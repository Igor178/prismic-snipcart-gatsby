import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 24px;
  margin-bottom: 24px;
  align-items: center;
  justify-items: center;
  border: 1px solid #f93159;
  border-radius: 4px;
`

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 4px;
  background-color: #f93159;
  color: white;
  border-radius: ${props => (props.left ? "3px 0 0 3px" : "0 3px 3px 0")};
  border: 1px solid #f93159;
  outline: none;

  :hover {
    background-color: #fc254d;
  }
`

const QtyBtn = ({ setQty, qty }) => {
  const addOneItem = () => {
    return setQty(qty + 1)
  }

  const removeOneItem = () => {
    if (qty <= 1) {
      return console.log("Lowest possible quantity.")
    } else {
      return setQty(qty - 1)
    }
  }

  return (
    <Wrapper>
      <Button left onClick={addOneItem}>
        +
      </Button>
      <p style={{ marginBottom: 0 }}>{qty}</p>
      <Button onClick={removeOneItem}>-</Button>
    </Wrapper>
  )
}

export default QtyBtn
