import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import FunctionBar from './components/FunctionBar'
import Sheet from './components/Sheet'

function App() {
  const [numbers, setNumbers] = useState({ cols: 0, rows: 0 })
  const [show, setShow] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    setNumbers({ cols: data.cols, rows: data.rows })
    setShow(true)
  }

  return (
    <div>
      <div className='title'>Spreadsheet</div>
      {show ? (
        <div>
          <FunctionBar />
          <Sheet numberOfRows={numbers.rows} numberOfColumns={numbers.cols} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <h2 className='form__title'>Enter the value for columns and rows</h2>
          <p>
            <label for='rows'>Rows</label>{' '}
            <input
              {...register('rows', { required: true })}
              type='number'
              min={1}
              max={100}
            />
          </p>
          <p>
            {' '}
            {errors.rows && (
              <span className='error'>This field is required</span>
            )}
          </p>
          <p>
            <label for='cols'>Columns</label>
            <input
              {...register('cols', { required: true })}
              type='number'
              min={1}
              max={26}
            />
          </p>
          <p>
            {errors.cols && (
              <span className='error'>This field is required</span>
            )}
          </p>
          <button type='submit'>Add</button>
        </form>
      )}
    </div>
  )
}

export default App
