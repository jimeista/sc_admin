import React, { createContext, useState } from 'react'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  let [selectedValue, setSelectedValue] = useState()
  let [selectedDictionaryName, setSelectedDictionaryName] = useState()
  let [selectedIndustry, setSelectedIndustry] = useState()
  let [filteredData, setFilteredData] = useState(null)
  let [indicators, setIndicators] = useState({})
  let [searchText, setSearchText] = useState()
  let [fetchedDictionaryData, setFetchedDictionaryData] = useState({
    loading: true,
  })
  let [fetchedIndicatorInfoData, setFetchedIndicatorInfoData] = useState({
    loading: true,
  })
  let [fetchedIndicatorData, setFetchedIndicatorData] = useState({
    loading: true,
  })
  let [
    fetchedIndicatorStrategyData,
    setFetchedIndicatorStrategyData,
  ] = useState({
    loading: true,
  })
  let [modalIndicator, setModalIndicator] = useState()

  return (
    <AppContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        filteredData,
        setFilteredData,
        indicators,
        setIndicators,
        dictionary_names,
        searchText,
        setSearchText,
        fetchedDictionaryData,
        setFetchedDictionaryData,
        fetchedIndicatorData,
        setFetchedIndicatorData,
        fetchedIndicatorStrategyData,
        setFetchedIndicatorStrategyData,
        fetchedIndicatorInfoData,
        setFetchedIndicatorInfoData,
        selectedDictionaryName,
        setSelectedDictionaryName,
        selectedIndustry,
        setSelectedIndustry,
        modalIndicator,
        setModalIndicator,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }

const dictionary_names = [
  'Сфера',
  'Государственная программа',
  'Периодичность обновления',
  'Единица измерения',
  'Ответственный орган',
  'Источник информации',
  'Стратегия 2050',
  // 'Стратегия 2050',
]
