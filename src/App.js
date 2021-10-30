import React from 'react'

import FunctionBar from './components/FunctionBar'
import Sheet from './components/Sheet'

const InputContext = React.createContext()

function App() {
  return (
    <InputContext.Provider value=''>
      <div>
        <div className='title'>Spreadsheet</div>
        <FunctionBar />
        <Sheet numberOfRows={10} numberOfColumns={10} />
      </div>
    </InputContext.Provider>
  )
}

export default App
