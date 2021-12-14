import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'

import { activeIndex, inputValue, submitField } from '../atom/Cell'

const Cell = ({ isActive, currentIndex, cellInputValue }) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const [index, setIndex] = useState('')

  const [getS, setGetS] = useState('?s')
  const [getP, setGetP] = useState('?p')
  const [getO, setGetO] = useState('?o')

  const [currentActiveIndex, setCurrentActiveIndex] =
    useRecoilState(activeIndex)

  const [inputTerm, setInputTerm] = useRecoilState(inputValue)
  const [submitForm, setSubmitForm] = useRecoilState(submitField)

  const [currentStatus, setCurrentStatus] = useState(false)

  const handleChange = (event) => {
    setValue(event.target.value)
    let clonedInputTerm = { ...inputTerm }
    clonedInputTerm.value = event.target.value
    setInputTerm(clonedInputTerm)
  }
  const handleKeypress = async (event) => {
    if (event.which === 13) {
      submitFunction(event.target.value)
      setSubmitForm(true)
      event.target.blur()
      setActive(false)
    }
  }
  const handleClick = () => {
    setIndex(currentIndex)
    setCurrentActiveIndex(currentIndex)
  }
  let query = `%7B${getS}+${getP}+${getO}%7D`
  let baseUrl = `http://projectware.net:8890/sparql/?default-graph-uri=urn%3Asparql%3Abind%3Avamk-data&query=select+*+${query}&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+`

  useEffect(() => {
    query = `%7B${getS}+${getP}+${getO}%7D`
    baseUrl = `http://projectware.net:8890/sparql/?default-graph-uri=urn%3Asparql%3Abind%3Avamk-data&query=select+*+${query}&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+`
  }, [getS, getO, getP])

  const submitFunction = async (text) => {
    if (/S.*/.test(text)) {
      if (/s="(?:[^"])\w+/.test(text)) {
        console.log(text.match(/s="(?:[^"])\w+/))
        let subject = text.match(/s="(?:[^"])\w+/)

        setGetS(`%3C${subject[0].slice(3)}%3E`)
      }
      if (/p="(?:[^"])\w+/.test(text)) {
        console.log(text.match(/p="(?:[^"])\w+/))
        let predicator = text.match(/p="(?:[^"])\w+/)

        setGetP(`%3C${predicator[0].slice(3)}%3E`)
      }
      if (/o="(?:[^"])\w+/.test(text)) {
        console.log(text.match(/o="(?:[^"])\w+/))
        let operator = text.match(/o="(?:[^"])\w+/)

        setGetO(`${operator[0].slice(3)}`)
      }

      const fetchData = await axios.get(baseUrl).then((res) => {
        console.log(res.data.results.bindings)
        return res.data.results.bindings
      })
      setValue(fetchData)
      setCurrentStatus(true)
    }
  }

  const inputEl = useRef(null)

  useEffect(() => {
    if (submitForm) {
      submitFunction(inputEl.current.value)
      setSubmitForm(false)
    }
  }, [submitForm])

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
      ref={inputEl}
    />
  ) : (
    <ul class='dropdown level-1' ref={inputEl}>
      <li>
        <a href='#'>Geton</a>
        <ul className='level-2'>
          {value &&
            Object.values(value).map((item, index) => (
              <li
                key={`${
                  item.s
                    ? item.s.value
                    : item.p
                    ? item.p.value
                    : item.o
                    ? item.o.value
                    : ''
                }_${index}`}>
                <a href='!#'>{`${
                  item.s
                    ? item.s.value
                    : item.p
                    ? item.p.value
                    : item.o
                    ? item.o.value
                    : ''
                }`}</a>
                <ul className='level-3'>
                  {item.s && (
                    <li>
                      <a href='!#'>{item.s.value}</a>
                    </li>
                  )}
                  {item.p && (
                    <li>
                      <a href='!#'>{item.p.value}</a>
                    </li>
                  )}
                  {item.o && (
                    <li>
                      <a href='!#'>{item.o.value}</a>
                    </li>
                  )}
                </ul>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  )
}

export default Cell
