import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import Cell from './Cell'
import { activeIndex, inputValue } from '../atom/Cell'

const Sheet = ({ numberOfRows, numberOfColumns }) => {
  const [indexActive, setIndexActive] = useState(false)
  const [currentIndex, setCurrentIndex] = useState('')

  const [inputTerm, setInputTerm] = useRecoilState(inputValue)

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
              cellInputValue={
                inputTerm.id === `${col + 1}${row}` ? inputTerm.value : ''
              }
            />
          </td>,
        )
      }
      tableBody.push(<tr key={`${row}`}>{tableRow}</tr>)
    }
    return tableBody
  }

  return (
    <table className='sheet' cellPadding={0} cellSpacing={0}>
      <thead>{tableHeader(alphabet)}</thead>
      <tbody>{tableBody()}</tbody>
      <tbody></tbody>
    </table>
  )
}

export default Sheet
