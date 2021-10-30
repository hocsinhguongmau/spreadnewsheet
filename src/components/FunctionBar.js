import React, { useState, useContext } from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { AiOutlineFunction } from 'react-icons/ai'
import InputContext from '../App'

export default function FunctionBar() {
  const inputValue = useContext(InputContext)
  const [formActive, setFormActive] = useState(false)
  const [value, setValue] = useState(inputValue)
  const handleSubmit = (e) => {
    e.preventDefault()
    setValue('')
    setFormActive(false)
  }
  const handleChange = (e) => {
    setValue(e.target.value)
    if (e.target.value.length > 0) {
      setFormActive(true)
    } else {
      setFormActive(false)
    }
  }
  const handleReset = () => {
    setValue('')
    setFormActive(false)
  }
  return (
    <form onSubmit={handleSubmit} className='function-bar'>
      <span>
        <button
          onClick={handleReset}
          className={`btn-del ${formActive ? 'active' : ''}`}>
          <IoClose />
        </button>
        <button
          type='submit'
          className={`btn-check ${formActive ? 'active' : ''}`}>
          <FaCheck />
        </button>
        <i>
          <AiOutlineFunction />
        </i>
      </span>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        className='kaputt'
      />
    </form>
  )
}
