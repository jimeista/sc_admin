import React from 'react'

//создаем наименования колонок под структуру antd table
//функция принимает следующие данные:
//массив справочников data, для фильтрации и выбора опции при редактировании строки таблицы
//тип индикатора key для переключения по табам "Аналитические индикаторы" и "Индикаторы стратегии"
//последние три параметра необходимы для компоненты "Показатели индикаторов", что позволяет открывать модальное окно и передавать данные "record" по выбранной строке
export const setTableColumns = (data, key, link, setOpen, setRecord) => {
  let names = [
    'Государственная программа',
    'Единица измерения',
    'Ответственный орган',
    'Источник информации',
    'Отрасль',
    'Периодичность обновления',
  ]

  names = [...names, key] //key может быть "Сфера" или "Стратегия 2050"

  return [
    //наименование индикатора сортируется
    {
      title: 'Индикатор',
      dataIndex: 'name',
      width: '20%',
      editable: true,
      sorter: (a, b) => strcmp(b.name, a.name),
      sortDirections: ['ascend'],
      render: (text, record) => {
        return link ? (
          <a
            onClick={() => {
              // console.log(record)
              setOpen(true) //открывает модальное окно при клике
              setRecord(record) //передаем информацию по выбранному индикатору
            }}
          >
            {text}
          </a>
        ) : (
          text
        )
      },
    },
    //наименования справочников
    ...names.map((name) => {
      //необходимо передать каждой колонке соответствующие данные опции при редактировании и фильтрации таблицы
      //данные для фильтрации нужно подстроить в формат ant table, так же ее можно использовать для выбора опции селекта при редактировании
      let filters = []

      if (name === 'Отрасль') {
        let field = data.find((i) => i.name === 'Сфера').options
        let strategy = data.find((i) => i.name === 'Стратегия 2050').options

        field.forEach((i) => {
          filters = [
            ...filters,
            ...i.options.map((ii) => ({
              text: ii.name,
              value: ii.name,
              id: ii.name,
            })),
          ]
        })

        strategy.forEach((i) => {
          filters = [
            ...filters,
            ...i.options.map((ii) => ({
              text: ii.name,
              value: ii.name,
              id: ii.id,
            })),
          ]
        })
      } else {
        filters = data
          .filter((i) => i.name === name)
          .map((ii) => ii.options.map((o) => ({ text: o.name, value: o.name })))
      }

      filters = [].concat(...filters)

      //немного стилизации длинны колонок таблицы
      let width =
        name === 'Единица измерения' || name === 'Периодичность обновления'
          ? '10%'
          : '14%'

      return {
        title: key === name ? 'Сфера' : name,
        dataIndex: name,
        align: 'center',
        data: filters,
        width: width,
        type: 'select',
        filters: filters,
        editable: true,
        onFilter: (value, record) => {
          return record[name] === value
        },
      }
    }),
  ]
}

//подгоняем индикатор data под структуру antd table
export const setTableData = (data) => {
  return data.map((i) => {
    //так как объект i,индикатор, содержит объект с наименованиями справочников
    //необходимо каждый справочник подогнать под свой ключ
    let dictionaries = {}

    Object.keys(i.dictionaries).forEach((key) => {
      dictionaries = {
        ...dictionaries,
        [key]: i.dictionaries[key],
      }
    })

    return {
      key: i.id,
      id: i.id,
      name: i.name,
      ...dictionaries,
    }
  })
}

//вспомогательная функция для сортировки
export const strcmp = (a, b) => {
  if (a === b) {
    return 0
  }

  if (a > b) {
    return 1
  }

  return -1
}
