import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { AiOutlineFunction } from 'react-icons/ai'

import { activeIndex, inputValue, submitField } from '../atom/Cell'

export default function FunctionBar() {
  const [formActive, setFormActive] = useState(false)
  const [value, setValue] = useState()
  const [disabled, setDisabled] = useState(true)

  const [currentActiveIndex, setCurrentActiveIndex] =
    useRecoilState(activeIndex)

  const [inputTerm, setInputTerm] = useRecoilState(inputValue)
  const [submitForm, setSubmitForm] = useRecoilState(submitField)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitForm(true)
  }
  const handleChange = (e) => {
    setInputTerm({ id: currentActiveIndex, value: e.target.value })
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

  useEffect(() => {
    setValue(inputTerm.value)
    currentActiveIndex && setDisabled(false)
  }, [inputTerm, currentActiveIndex])

  return (
    <form onSubmit={handleSubmit} className='function-bar'>
      <span>
        {/* <button
          onClick={handleReset}
          className={`btn-del ${formActive ? 'active' : ''}`}>
          <IoClose />
        </button>
        <button
          type='submit'
          className={`btn-check ${formActive ? 'active' : ''}`}>
          <FaCheck />
        </button> */}
        <i>
          <AiOutlineFunction />
        </i>
      </span>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        className='kaputt'
        disabled={disabled}
      />
    </form>
  )
}
