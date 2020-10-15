import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  max-width: 470px;
`

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex: 1;

  ::placeholder {
    color: rgba(0, 0, 0, 0.7);
  }
`

const Search = () => {
  return (
    <Wrapper>
      <Input placeholder="Search products..." />
    </Wrapper>
  )
}

export default Search
