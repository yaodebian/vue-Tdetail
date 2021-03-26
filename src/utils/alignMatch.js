// get align info between row1 and row2
function match(row1, index1, row2, index2) {
  let count1 = 0, count2 = 0
  let j = 0
  const resArr = []
  for (let i = 0; i < row1.length - 1; i++) {
    count1 += row1[i].colspan

    for (; j < row2.length; j++) {
      const temp = count2 + row2[j].colspan
      if (temp > count1) {
        break
      }
      count2 = temp
      if (count2 === count1) {
        resArr.push(`${index1}-${i}:${index2}-${j}`) // it means "row-index1"'s column i aligns with "row-index2"'s column j
        j++
        break
      } 
    }
  }
  
  return resArr
}

// get all align info
export const alignMatch = rows => {
  let resArr = []
  for (let i = 0; i < rows.length - 1; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      resArr = resArr.concat(match(rows[i], i, rows[j], j))
    }
  }

  return resArr
}

// get align info of "row-rowIndex"'s column colIndex
export const restAlignList = (matchList, rowIndex, colIndex) => {
  const resArr = []
  const regExpPre = new RegExp(`^${rowIndex}-${colIndex}`)
  const regExpBhi = new RegExp(`${rowIndex}-${colIndex}$`)

  for (let item of matchList) {
    if (regExpPre.test(item)) {
      resArr.push(item.split(':')[1].split('-').map(item => parseInt(item)))
    }
    if (regExpBhi.test(item)) {
      resArr.push(item.split(':')[0].split('-').map(item => parseInt(item)))
    }
  }

  return resArr
}