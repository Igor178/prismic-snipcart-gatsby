import React, { useRef } from "react"
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick"

const CloseDropdownOnOutsideClick = props => {
  const wrapperRef = useRef(null)
  useDetectOutsideClick(wrapperRef, props.setDropdown)
  return <div ref={wrapperRef}>{props.children}</div>
}

export default CloseDropdownOnOutsideClick
