import React, { useEffect, useState } from 'react'
import Cell from './Cell'

const Sheet = ({ numberOfRows, numberOfColumns }) => {
  const [indexActive, setIndexActive] = useState(false)
  const [currentIndex, setCurrentIndex] = useState('')

  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const alphabet = alpha.map((x) => String.fromCharCode(x))
  const tableHeader = (alphabet) => {
    let tableHead = [<th key='empty' className='first'></th>]
    for (let col = 0; col < numberOfColumns; col++) {
      tableHead.push(<th key={`head_${col}`}>{alphabet[col]}</th>)
    }
    return <tr>{tableHead}</tr>
  }
  const tableBody = () => {
    let tableBody = []
    for (let row = 1; row <= numberOfRows; row++) {
      let tableRow = [<td key='empty'>{row}</td>]
      for (let col = 0; col < numberOfColumns; col++) {
        tableRow.push(
          <td key={`${col}${row}`} id={`${col}${row}`}>
            <Cell
              isActive={(active) => setIndexActive(active)}
              currentIndex={`${col + 1}${row}`}
              getIndex={(index) => setCurrentIndex(index)}
            />
          </td>,
        )
      }
      tableBody.push(<tr key={`${row}`}>{tableRow}</tr>)
    }
    return tableBody
  }

  console.log(currentIndex)

  // console.log('currentIndex', currentIndex, 'indexActive', indexActive)

  const tableBody2 = (numberOfRows, numberOfColumns) => {
    return Array(numberOfRows)
      .fill()
      .map((row, i) => {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            {Array(numberOfColumns)
              .fill()
              .map((col, j) => {
                return <td key={`${i}${j}`}>a</td>
              })}
          </tr>
        )
      })
  }

  // const newArr = tableBody2(numberOfRows, numberOfColumns)[0]
  // const selectedIndex = newArr.props.children[1].filter((x) => x.key === '00')

  // console.log(selectedIndex)
  // useEffect(() => {
  //   const input = document.querySelector('.active')
  //   if (input) {
  //     console.log(input.value)
  //   }
  // }, [tableBody])
  return (
    <table className='sheet' cellPadding={0} cellSpacing={0}>
      <thead>{tableHeader(alphabet)}</thead>
      <tbody>{tableBody()}</tbody>
      {/* <tbody>{tableBody2(numberOfRows, numberOfColumns)}</tbody> */}
      <tbody></tbody>
    </table>
  )
}

export default Sheet
