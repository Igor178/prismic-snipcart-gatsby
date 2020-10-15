import { useState } from "react"

const useTagSearch = () => {
  const [tag, setTag] = useState("All")
  return {
    tag,
    setTag,
  }
}

export default useTagSearch
