const updatePrice = (basePrice, values, customValue) => {
  const selectedOption = values.find(option => option.size.text === customValue)

  return (basePrice + selectedOption.price).toFixed(2)
}

export default updatePrice
