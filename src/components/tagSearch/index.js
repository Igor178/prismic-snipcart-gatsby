import React from "react"
import styled from "styled-components"

const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #d1d0d1;
  box-shadow: 0px 4px 40px rgba(218, 218, 218, 0.5);
  padding: 16px;

  margin-bottom: 24px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-gap: 16px;

  label {
    cursor: pointer;

    input {
      margin-right: 8px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, auto);
  }
`

const TagSearch = ({ tag, setTag }) => {
  return (
    <Container>
      <p>Filters:</p>
      <Wrapper>
        <label htmlFor="All">
          <input
            type="radio"
            id="All"
            name="All"
            value="All"
            onChange={e => setTag(e.target.value)}
            checked={tag === "All"}
          />
          <span>All Products</span>
        </label>
        <label htmlFor="new">
          <input
            type="radio"
            id="new"
            name="new"
            value="New"
            onChange={e => setTag(e.target.value)}
            checked={tag === "New"}
          />
          <span>New Products</span>
        </label>
        <label htmlFor="On Sale">
          <input
            type="radio"
            id="On Sale"
            name="On Sale"
            value="On Sale"
            onChange={e => setTag(e.target.value)}
            checked={tag === "On Sale"}
          />
          <span>On Sale</span>
        </label>
        <label htmlFor="Best Seller">
          <input
            type="radio"
            id="Best Seller"
            name="Best Seller"
            value="Best Seller"
            onChange={e => setTag(e.target.value)}
            checked={tag === "Best Seller"}
          />
          <span>Best Seller</span>
        </label>
        <label htmlFor="In Stock">
          <input
            type="radio"
            id="In Stock"
            name="In Stock"
            value="In Stock"
            onChange={e => setTag(e.target.value)}
            checked={tag === "In Stock"}
          />
          <span>In Stock</span>
        </label>
      </Wrapper>
    </Container>
  )
}

export default TagSearch
