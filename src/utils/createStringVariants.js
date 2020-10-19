import calculateDiscount from "./calculateDiscount"

const createStringVariants = (values, price, discount) => {
  if (discount) {
    return values
      .map(option => {
        const price =
          option.price >= 0
            ? `[+${calculateDiscount(option.price, discount)}]`
            : `[${option.price}]`
        return `${option.size.text}${price}`
      })
      .join("|")
  } else {
    return values
      .map(option => {
        const price =
          option.price >= 0 ? `[+${option.price}]` : `[${option.price}]`
        return `${option.size.text}${price}`
      })
      .join("|")
  }
}

export default createStringVariants
