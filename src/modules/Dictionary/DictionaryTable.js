import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Form } from 'antd'

import {
  deleteDictionary,
  putDictionary,
} from '../../features/dictionary/dictionarySlice'
import { CustomTable as Table } from '../../common/Table'
import {
  setTableDefaultDataSource,
  setTableOtherDataSource,
  setTableFieldDataSource,
} from '../../utils/dictionary_table'

//данная компонента реализует:
//отрисовку данных, поиск, редактирование и удаление справочника
const DictionaryTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState() //массив фильтрованных значении по поиску

  const dispatch = useDispatch()
  const { data, status, selected } = useSelector((state) => state.dictionary)

  const [form] = Form.useForm()

  useEffect(() => {
    //при загрузке или обновления страницы
    //форма и значение фильтрованных данных поиска сбрасываются
    setFiltered()
    form.resetFields()

    //при успешной загрузке, данные подстраиваются под структуру ant table
    //в зависимости от выбранного значения справочника выполняется последовательная логика
    //детальное описание функции прописанно в надлежащем файле
    if (status === 'success') {
      if (selected === 'Сфера' || selected === 'Стратегия 2050') {
        setDataSource(setTableFieldDataSource(data, selected))
      } else if (selected === 'Все справочники') {
        setDataSource(setTableDefaultDataSource(data))
      } else {
        setDataSource(setTableOtherDataSource(data, selected))
      }
    }
  }, [selected, data, status, form])

  //реализация поиска по таблице
  const onSearch = (e) => {
    let filtered_ = []
    if (
      selected === 'Все справочники' ||
      selected === 'Сфера' ||
      selected === 'Стратегия 2050'
    ) {
      dataSource.forEach((i) => {
        //переменная для фильтраванных дочерних эллементов
        let arr = i.children.filter((с) =>
          с.name.toLowerCase().includes(e.target.value.toLowerCase())
        )

        if (arr.length > 0) {
          filtered_ = [{ ...i, children: arr }, ...filtered_]
        }
      })
    } else {
      filtered_ = dataSource.filter((i) =>
        i.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    }

    filtered_.length > 0 ? setFiltered(filtered_) : setFiltered([])
  }

  //инициализация своиства ant table columns
  const columns = useMemo(() => {
    return [
      {
        title: 'Наименование',
        dataIndex: 'name',
        editable: true,
      },
    ]
  }, [])

  //реализация редактирования данных с таблицы
  const onEdit = (record) => {
    dispatch(
      putDictionary({
        id: record.record.id,
        data: {
          tag: record.record.tag,
          name: record['name'],
        },
      })
    )
  }

  //реализация удаления данных с таблицы
  const onDelete = (record) => {
    dispatch(deleteDictionary(record.id))
  }

  return (
    <Form form={form}>
      <Form.Item name={'search'}>
        <Input
          placeholder='Поиск справочника'
          onChange={onSearch}
          allowClear={true}
          style={{ width: '30%', margin: '15px 0' }}
        />
      </Form.Item>
      <Table
        columns={columns}
        data={filtered ? filtered : dataSource}
        setData={setDataSource}
        loading={status !== 'success' ? true : false}
        handleEdit={onEdit}
        handleDelete={onDelete}
        isEditable={selected !== 'Все справочники' ? false : true}
        isDeletable={selected !== 'Все справочники' ? false : true}
        expandable={filtered ? true : false}
      />
    </Form>
  )
}

export default React.memo(DictionaryTable)
