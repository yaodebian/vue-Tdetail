// init rows list
export default (col, list) => {
  col = col || 3
  const resArr = []
  let i = 0
  while (i < list.length) {
    const temp = []
    let len = 0
    for (let n = i; n < i + col; n++) {
      if (n >= list.length) {
        temp[temp.length - 1].colspan += col - len
        i = n + 1
        break
      }
      const tempItem = JSON.parse(JSON.stringify(list[n]))
      tempItem.colspan = tempItem.colspan ? tempItem.colspan : 1
      if ((len + tempItem.colspan > col) || (len + tempItem.colspan <= col && n === i + col - 1)) {
        tempItem.colspan = col - len
      }
      temp.push(tempItem)
      len += tempItem.colspan
      if (len === col) {
        i = n + 1
        break
      }
    }
    resArr.push(temp)
  }
  return resArr
}