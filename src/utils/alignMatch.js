function match(row1, index1, row2, index2) {
  let count1 = 0, count2 = 0
  let j = 0
  const resArr = []
  for (let i = 0; i < row1.length - 1; i++) {
    count1 += row1[i].colspan

    for (; j < row2.length; j++) {
      count2 += row2[j]
      if (count2 === count1) {
        resArr.push(`${index1}-i:${index2}:j`)
      }
    }
  }
  
  return resArr
}

export const alignMatch = rows => {
  let resArr = []
  for (let i = 0; i < rows.length - 1; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      resArr = resArr.concat(match(rows[i], i, rows[j], j))
    }
  }

  return resArr
}

export const restAlignList = (matchList, rowIndex, colIndex) => {
  const resArr = []
  const regExpPre = new RegExp(`^${rowIndex}-${colIndex}`)
  const regExpBhi = new RegExp(`${rowIndex}-${colIndex}$`)

  for (let item of matchList) {
    if (regExpPre.test(item)) {
      resArr.push(item.split(':')[1].split('-'))
    }
    if (regExpBhi.test(item)) {
      resArr.push(item.split(':')[0].split('-'))
    }
  }

  return resArr
}