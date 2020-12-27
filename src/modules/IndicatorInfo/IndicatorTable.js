import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Input, Modal } from 'antd'

import { setTableColumns, setTableData } from '../../utils/indicator_table'

import IndicatorinfoModalContent from './IndicatorinfoModalContent'
import { CustomTable as Table } from '../../common/Table'

//главная страница отрисовки таблицы индикаторов
//индикаторы таблицы, не редактируемые и не удаляемые
//данная компонента позволяет открывать модальное окно показателей индикатора по свойству type
const IndicatorTable = ({ type }) => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()
  const [open, setOpen] = useState(false) //состояние модального окна
  const [record, setRecord] = useState(null) //состояние выбранного индикатора для отображения показателей в модальном окне

  const { data, status, dictionaries } = useSelector(
    (state) => state.indicatorinfo
  )

  useEffect(() => {
    //при загрузке или обновления страницы
    //таблица перерисуется в зависимости изменения data индикаторов
    //находим индикаторы Тип аналитического индикатора
    let data_ = data.filter((i) => i.dictionaries['Тип'] === type)
    status === 'success' && setDataSource(setTableData(data_))
  }, [data, status, type])

  //реализация поиска по таблице
  const onSearch = (e) => {
    let filtered_ = dataSource.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setFiltered(filtered_)
  }

  //инициализация своиства ant table columns
  const columns = useMemo(() => {
    if (dictionaries.status === 'success') {
      //вспомогательная функиция setTableColumns
      //реализует отрисовку соответсвующих справочников и открытие модального окна
      return setTableColumns(
        dictionaries.data,
        type === 'Индикатор' ? 'Сфера' : 'Стратегия 2050',
        true,
        setOpen,
        setRecord
      )
    } else {
      return []
    }
  }, [dictionaries, type])

  return (
    <>
      <Input
        placeholder='Поиск по низванию индикатора'
        onChange={onSearch}
        allowClear={true}
        style={{ width: '30%', margin: '15px 0' }}
      />
      <Table
        columns={columns}
        data={filtered ? filtered : dataSource}
        setData={setDataSource}
        loading={dictionaries.status !== 'success' ? true : false}
      />

      {/* модальное окно реализует отрисовку отдельной компоненты */}
      <Modal
        title={record && record.name}
        visible={open}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        width={'80%'}
        footer={null}
      >
        <IndicatorinfoModalContent record={record} />
      </Modal>
    </>
  )
}

export default React.memo(IndicatorTable)
