import React, { useRef, useContext } from 'react'
import { Input } from 'antd'
import { AppContext } from '../../context/main'

export const AdminSearch = ({ placeholder }) => {
  const inptRef = useRef()
  const { setSearchText } = useContext(AppContext)

  const handleSearch = () => setSearchText(inptRef.current.input.value)

  return (
    <Input
      placeholder={placeholder ? placeholder : 'Поиск справочника'}
      defaultValue=''
      ref={inptRef}
      allowClear
      onChange={handleSearch}
      /* style={style}*/
      className='AdminSearch_style'
    />
  )
}
