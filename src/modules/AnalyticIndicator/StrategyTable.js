import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd'

import {
  deleteIndicator,
  putIndicator,
} from '../../features/indicator/indicatorSlice'
import { setTableColumns, setTableData } from '../../utils/indicator_table'
import { findOptionId } from '../../utils/indicator_helper'

import { CustomTable as Table } from '../../common/Table'

//данная компонента реализует:
//отрисовку данных, поиск, редактирование и удаление индикатора стратегии
const StrategyTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const dispatch = useDispatch()
  const { data, status, dictionaries, putId, deletedId } = useSelector(
    (state) => state.indicator
  )

  useEffect(() => {
    //при загрузке или обновления страницы
    //таблица перерисуется в зависимости изменения data индикаторов
    //находим индикаторы Тип индикаторы стратегии
    let data_ = data.filter((i) => i.dictionaries['Тип'] === 'Стратегия')
    status === 'success' && setDataSource(setTableData(data_))

    //последовательная логика нужна для перерисовки клиента при редактировании и удалении данных с таблицы в момент поиска
    //тоесть,значение поискового поля не пуста
    if (deletedId) {
      setFiltered((state) => state && state.filter((i) => i.id !== deletedId))
    }

    if (putId) {
      setFiltered(
        (state) =>
          state &&
          state.map((i) =>
            i.id === putId.id ? setTableData([putId.value])[0] : i
          )
      )
    }
  }, [data, status, deletedId, putId])

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
      return setTableColumns(dictionaries.data, 'Стратегия 2050')
    } else {
      return []
    }
  }, [dictionaries])

  //реализация удаления данных с таблицы
  const onDelete = (record) => {
    dispatch(deleteIndicator(record.id))
  }

  //реализация редактирования данных с таблицы
  const onEdit = (record) => {
    //структура объекта на обновление клиентской части
    let client = {
      id: record.id,
      name: record.name,
      dictionaries: { Тип: 'Стратегия' },
    }
    //структура объекта отправки put запроса на сервер
    let server = {
      name: record.name,
      dictionaries: [229], //227 id индикатора Тип Стратегия
    }

    //подготовка отправки put запроса
    //находим id выбранных справочников
    Object.keys(record).forEach((key) => {
      if (
        key !== 'id' &&
        key !== 'name' &&
        key !== 'key' &&
        key !== 'Отрасль' &&
        key !== 'Тип' &&
        key !== 'record' &&
        record[key] !== undefined
      ) {
        //заполняем объект клиента наименованием справочника
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        //поиск объекта нужного справочника
        let dictionary_ = dictionaries.data.find((i) => i.name === key)
        //находим id справочника
        let id = dictionary_.options.find((o) => o.name === record[key]).id

        //заполняем объект сервера id справочника
        server = { ...server, dictionaries: [...server.dictionaries, id] }
      } else if (key === 'Отрасль' && record[key] !== undefined) {
        //поиск id отрасля по наименованию отрасля
        let id = findOptionId(dictionaries, record[key])
        //заполняем объект клиента наименованием отрасля
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        //заполняем объект сервера id отрасля
        server = {
          ...server,
          dictionaries: [...server.dictionaries, id],
        }
      }
    })

    // console.log(client, server, record)
    dispatch(putIndicator({ id: record.id, client, server }))
  }

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
        handleEdit={onEdit}
        handleDelete={onDelete}
        isEditable={true}
        isDeletable={true}
      />
    </>
  )
}

export default React.memo(StrategyTable)
