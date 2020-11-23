export const getObjectKeys = (obj) => Object.keys(obj).map((key) => key)

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const strcmp = (a, b) => {
  if (a === b) {
    return 0
  }

  if (a > b) {
    return 1
  }

  return -1
}
