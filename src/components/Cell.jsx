import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Cell = ({ isActive, currentIndex, getIndex }) => {
  // useEffect(() => {
  //   const inputs = document.getElementById('11').childNodes[0].value
  //   console.log(inputs)
  // }, [])
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('a')
  const [index, setIndex] = useState('')

  const [currentStatus, setCurrentStatus] = useState(false)
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const handleKeypress = async (event) => {
    if (event.which === 13) {
      if (/=S/.test(event.target.value)) {
        const fetchData = await axios
          .get('https://jsonplaceholder.typicode.com/todos/1')
          .then((res) => res.data)
        setValue(fetchData)
        setCurrentStatus(true)
      }
      event.target.blur()
    }
  }

  const handleClick = () => {
    setActive(true)
    setIndex(currentIndex)
  }

  useEffect(() => {
    if (active) {
    }
    isActive(active)
  }, [active])

  useEffect(() => {
    console.log(index)
    index && getIndex(index)
  }, [index])

  return !currentStatus && typeof value === 'string' ? (
    <input
      className={`input ${active ? 'active' : ''}`}
      value={value}
      type='text'
      onKeyPress={handleKeypress}
      onChange={handleChange}
      onFocus={handleClick}
      onBlur={() => setActive(false)}
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
