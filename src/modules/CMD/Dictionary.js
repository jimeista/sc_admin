import React from 'react'
import { AppContextProvider } from './context/main'

import { Dictionary } from './components/Dictionary'

export const CustomDictionary = () => {
  return (
    <>
      <AppContextProvider>
        <Dictionary />
      </AppContextProvider>
    </>
  )
}
