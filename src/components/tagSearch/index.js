import React from "react"

const TagSearch = ({ tag, setTag }) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <label htmlFor="All" style={{ cursor: "pointer" }}>
        <input
          type="radio"
          id="All"
          name="All"
          value="All"
          onChange={e => setTag(e.target.value)}
          checked={tag === "All"}
          style={{ marginRight: 8 }}
        />
        <span style={{ marginRight: 24 }}>All Products</span>
      </label>
      <label htmlFor="new" style={{ cursor: "pointer" }}>
        <input
          type="radio"
          id="new"
          name="new"
          value="New"
          onChange={e => setTag(e.target.value)}
          checked={tag === "New"}
          style={{ marginRight: 8 }}
        />
        <span style={{ marginRight: 24 }}>New Products</span>
      </label>
      <label htmlFor="On Sale" style={{ cursor: "pointer" }}>
        <input
          type="radio"
          id="On Sale"
          name="On Sale"
          value="On Sale"
          onChange={e => setTag(e.target.value)}
          checked={tag === "On Sale"}
          style={{ marginRight: 8 }}
        />
        <span style={{ marginRight: 24 }}>On Sale</span>
      </label>
      <label htmlFor="Best Seller" style={{ cursor: "pointer" }}>
        <input
          type="radio"
          id="Best Seller"
          name="Best Seller"
          value="Best Seller"
          onChange={e => setTag(e.target.value)}
          checked={tag === "Best Seller"}
          style={{ marginRight: 8 }}
        />
        <span>Best Seller</span>
      </label>
    </div>
  )
}

export default TagSearch
