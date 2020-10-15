import { useEffect } from "react"

const useDetectOutsideClick = (ref, setDropdown) => {
  const clickListener = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropdown(false) // using optional chaining here, change to onClose && onClose(), if required
    }
  }

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener("click", clickListener)
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener("click", clickListener)
    }
  }, [ref])
}

export default useDetectOutsideClick
