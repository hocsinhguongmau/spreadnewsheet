import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'

import { activeIndex, inputValue } from '../atom/Cell'

const Cell = ({ isActive, currentIndex, cellInputValue }) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const [index, setIndex] = useState('')

  const [currentActiveIndex, setCurrentActiveIndex] =
    useRecoilState(activeIndex)

  const [inputTerm, setInputTerm] = useRecoilState(inputValue)

  const [currentStatus, setCurrentStatus] = useState(false)

  const handleChange = (event) => {
    setValue(event.target.value)
    let clonedInputTerm = { ...inputTerm }
    clonedInputTerm.value = event.target.value
    setInputTerm(clonedInputTerm)
  }
  const handleKeypress = async (event) => {
    if (event.which === 13) {
      if (/=S/.test(event.target.value)) {
        const fetchData = await axios
          .get('https://jsonplaceholder.typicode.com/todos/1')
          .then((res) => res.data)
        console.log(fetchData)
        setValue(fetchData)
        setCurrentStatus(true)
      }
      event.target.blur()
      setActive(false)
    }
  }
  const handleClick = () => {
    setIndex(currentIndex)
    setCurrentActiveIndex(currentIndex)
  }

  useEffect(() => {
    setActive(false)
    if (currentIndex === currentActiveIndex) {
      setActive(true)
    }
  }, [currentActiveIndex])

  useEffect(() => {
    if (index) {
      let inputData = { id: index, value: value }
      setInputTerm(inputData)
      setIndex('')
    }
  }, [index, value, inputTerm])

  useEffect(() => {
    if (cellInputValue) {
      setValue(cellInputValue)
    }
  }, [cellInputValue])

  return !currentStatus && typeof value === 'string' ? (
    <input
      className={`input ${active ? 'active' : ''}`}
      value={cellInputValue ? cellInputValue : value}
      type='text'
      onKeyPress={handleKeypress}
      onChange={handleChange}
      onFocus={handleClick}
    />
  ) : (
    <select>
      {value &&
        Object.values(value).map((item, index) => (
          <option key={`${item}_${index}`} value={item}>
            {item.toString()}
          </option>
        ))}
    </select>
  )
}

export default Cell
