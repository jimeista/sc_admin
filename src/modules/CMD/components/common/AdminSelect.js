import React, { useContext } from 'react'
import { TreeSelect } from 'antd'
import { AppContext } from '../../context/main'

export const AdminSelect = ({
  data,
  placeholder = 'Выбрать справочник',
  style = { margin: 5, marginLeft: 0, marginRight: 8 },
  callBack,
  defaultValue,
}) => {
  const {
    setSelectedDictionaryName,
    setSelectedIndustry,
    dictionary_names,
  } = useContext(AppContext)

  const handleChangeDictionaryName = (value) => setSelectedDictionaryName(value)
  const handleChangeOptionName = (value) => {
    const selected_value = data.find((item) => item.value === value)
    setSelectedIndustry(value)
    callBack && selected_value && callBack(selected_value.id)
  }

  const setTreeData = (data) =>
    data.map((name) => ({
      title: name,
      value: name,
      children: [],
    }))

  const renderSelect = () =>
    data ? (
      <TreeSelect
        style={style}
        allowClear
        placeholder={placeholder}
        treeData={data}
        onChange={handleChangeOptionName}
        className='AdminSelect_style'
        defaultValue={defaultValue}
        virtual={false}
      />
    ) : (
      <TreeSelect
        placeholder={placeholder}
        onChange={handleChangeDictionaryName}
        style={style}
        treeData={setTreeData(dictionary_names)}
        className='AdminSelect_style'
        virtual={false}
      />
    )

  return <>{renderSelect()}</>
}
