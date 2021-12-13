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

  // const [url, setUrl] = useState(
  // 'http://projectware.net:8890/sparql/?default-graph-uri=urn%3Asparql%3Abind%3Avamk-data&query=select+*+%7B%3Fs+%3Fp+%3Fo%7D&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+',
  // )

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
      // console.log(/o="(?:[^"])\w+/.test(text))
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
      // S(s="15",p="10",o="")
      // S(s="mg@vamk.fi",p="",o="")
      // S(s="",p="10",o="")

      const text_dung =
        'http://projectware.net:8890/sparql/?default-graph-uri=urn%3Asparql%3Abind%3Avamk-data&query=select+*+%7B%3C15%3E+%3Fp+%3Fo%7D%0D%0A&should-sponge=&format=text%2Fhtml&timeout=0&debug=on&run=+Run+Query+'
      const text_xaolon =
        'http://projectware.net:8890/sparql/?default-graph-uri=urn%3Asparql%3Abind%3Avamk-data&query=select+*+%7B15+?p+?o%7D&should-sponge=&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on&run=+Run+Query+'

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
    <select ref={inputEl}>
      {value &&
        Object.values(value).map((item, index) => (
          <optgroup
            key={`${
              item.s
                ? item.s.value
                : item.p
                ? item.p.value
                : item.o
                ? item.o.value
                : ''
            }_${index}`}
            label={`${
              item.s
                ? item.s.value
                : item.p
                ? item.p.value
                : item.o
                ? item.o.value
                : ''
            }`}>
            {item.s && <option value={item.s.value}>{item.s.value}</option>}
            {item.p && <option value={item.p.value}>{item.p.value}</option>}
            {item.o && <option value={item.o.value}>{item.o.value}</option>}
          </optgroup>
        ))}
    </select>
  )
}

export default Cell
