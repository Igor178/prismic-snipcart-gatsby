const createStringVariants = values => {
  return values
    .map(option => {
      const price =
        option.price >= 0 ? `[+${option.price}]` : `[${option.price}]`
      return `${option.size.text}${price}`
    })
    .join("|")
}

export default createStringVariants
