import React from 'react'

import FunctionBar from './components/FunctionBar'
import Sheet from './components/Sheet'

function App() {
  return (
    <div>
      <div className='title'>Spreadsheet</div>
      <FunctionBar />
      <Sheet numberOfRows={10} numberOfColumns={10} />
    </div>
  )
}

export default App
