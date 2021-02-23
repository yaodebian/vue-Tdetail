export const getRows = (col, list) => {
  col = col || 3
  const resArr = []
  let i = 0
  while (i < list.length) {
    const temp = []
    let len = 0
    let index = i
    for (let n = i; n < i + col; n++) {
      if (n >= list.length) {
        temp[temp.length - 1].colspan += col - len
        index = n
        break
      }
      const tempItem = JSON.parse(JSON.stringify(list[n]))
      tempItem.colspan = tempItem.colspan ? Math.floor(tempItem.colspan) : 1
      if (len + tempItem.colspan > col && col - len >= 1) {
        tempItem.colspan = col - len
      } else if (len + tempItem.colspan > col && col - len < 1) {
        index = n
        break
      }
      temp.push(tempItem)
      len += tempItem.colspan
    }
    if (index === i) {
      i = i + col
    } else {
      i = index
    }
    resArr.push(temp)
  }
  console.log(resArr)
  return resArr
}