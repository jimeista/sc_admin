import React from 'react'
import { AppContextProvider } from './context/main'

import { Indicators } from './components/Indicators'

export const CustomIndicator = () => {
  return (
    <>
      <AppContextProvider>
        <Indicators />
      </AppContextProvider>
    </>
  )
}
