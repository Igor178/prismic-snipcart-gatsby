const calculateDiscount = (price, discount) => {
  let firstValue = (price * discount) / 100
  let secondValue = (firstValue / 100) * 100
  let discountedPrice = price - Number(secondValue.toFixed(2))

  return discountedPrice.toFixed(2)
}

export default calculateDiscount
