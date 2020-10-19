import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 12px;

  span {
    padding: 0 8px;
  }
`

const CrumbLabel = styled(Link)`
  color: black;
  font-style: italic;
  text-transform: capitalize;
  text-decoration: none;
`

const Breadcrumbs = ({ pathname }) => {
  let paths = pathname.split("/").splice(1)

  return (
    <Wrapper>
      <CrumbLabel to="/">Home</CrumbLabel>
      <span>/</span>
      <CrumbLabel to={`/${paths[0]}`}>{paths[0]}</CrumbLabel>
      <span>/</span>
      <CrumbLabel to={`/${paths[0]}/${paths[1]}`}>
        {paths[1].replace("-", " ")}
      </CrumbLabel>
    </Wrapper>
  )
}

export default Breadcrumbs
