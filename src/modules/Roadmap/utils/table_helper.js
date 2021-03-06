import React from 'react'

export const setFilterSelectsHelper = (response) => {
  let ob = {}
  let result = []
  if (response.status === 'success') {
    const data = response.data
    for (let i = 0; i < data.length; i++) {
      ob = { ...ob, [data[i].name]: data[i].name }
    }
    result = Object.keys(ob).map((key) => ({ text: key, value: key }))
  }
  return result
}

export const setWorkListDataSourceHelper = (arr) => {
  const dataSource = arr.map((i) => {
    let keys = { key: i.id }
    Object.keys(i).forEach((key) => {
      if (key === 'status') {
        keys = {
          ...keys,
          percentage: i[key].percentage,
          'is-hidden': i[key]['is-hidden'],
          'is-canceled': i[key]['is-canceled'],
          commentary: i[key]['commentary'],
        }
      } else {
        keys = { ...keys, [key]: i[key] }
      }
    })
    return keys
  })

  return dataSource
}

export const setCrossListDataSourceHelper = (data, intersections) => {
  let dataSource = []
  if (intersections.status === 'success') {
    dataSource = intersections.data.map((i, index) => {
      let ob = {
        '№': ++index,
        key: ++index,
        id: i.id,
        address: i['intersection-area'],
        intersection: i.intersection,
        ids: i['roadwork-ids'],
      }

      i['roadwork-ids'].forEach((id, key) => {
        let item = data.find((i) => i.id === id)
        ob = {
          ...ob,
          category: item ? item.category : '',
          [`Работа ${key + 1}`]: id,
        }
      })

      return ob
    })
  }

  // const dataSource = data.map((i, index) => {
  //   let keys = { '№': index + 1, key: index + 1 }
  //   Object.keys(i).forEach((key) => {
  //     keys = { ...keys, [key]: i[key] }
  //   })
  //   return keys
  // })

  return dataSource
}

export const setWorkListTableColumnsHelper = (
  organisations,
  categories,
  setVisible,
  setRecord
) => [
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
    width: '2%',
    align: 'center',
    render: (text, record) => (
      <a
        onClick={() => {
          setRecord(record)
          setVisible(true)
        }}
      >
        {text}
      </a>
    ),
  },
  {
    title: 'Улица',
    dataIndex: 'address',
    key: 'address',
    render: (text, record) => <>{text}</>,
  },
  {
    title: 'Участок',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: 'Категория работ',
    dataIndex: 'category',
    key: 'category',
    filters: setFilterSelectsHelper(categories),
    onFilter: (value, record) => record.category.indexOf(value) === 0,
  },
  {
    title: 'Отв орган',
    dataIndex: 'organisation',
    key: 'organisation',
    filters: setFilterSelectsHelper(organisations),
    onFilter: (value, record) => record.organisation.indexOf(value) === 0,
  },
  {
    title: 'Дата начала',
    dataIndex: 'start-date',
    key: 'start-date',
    width: '10%',
    align: 'center',
    filters: date_filters,
    onFilter: (value, record) => record['start-date'].indexOf(value) === 0,
  },
  {
    title: 'Дата окончания',
    dataIndex: 'end-date',
    key: 'end-date',
    width: '10%',
    align: 'center',
    filters: date_filters,
    onFilter: (value, record) => record['end-date'].indexOf(value) === 0,
  },
  {
    title: 'Статус (%)',
    dataIndex: 'percentage',
    key: 'percentage',
    editable: true,
    width: '5%',
    rule: true,
    type: 'number',
    align: 'center',
    sorter: (a, b) => b.percentage - a.percentage,
    sortDirections: ['ascend'],
  },
]

export const setCrossListTableColumnsHelper = (
  setVisible,
  setRecord,
  intersections,
  categories
) => {
  let arr = []

  if (intersections.status === 'success') {
    let count = 0
    intersections.data.forEach((i) => {
      if (i['roadwork-ids'].length > count) {
        count = i['roadwork-ids'].length
      }
    })

    for (let i = 0; i < count; i++) {
      arr = [
        ...arr,
        {
          title: `Работа ${i + 1}`,
          dataIndex: `Работа ${i + 1}`,
          key: `Работа ${i + 1}`,
          width: '10%',
          align: 'center',
        },
      ]
    }
  }

  const cols = [
    {
      title: '№',
      dataIndex: '№',
      key: '№',
      width: '2%',
      align: 'center',
      render: (text, record) => {
        return (
          <a
            onClick={() => {
              setRecord(record)
              setVisible(true)
            }}
          >
            {text}
          </a>
        )
      },
    },
    {
      title: 'Улица',
      dataIndex: 'address',
      key: 'address',
      width: '20%',
    },
    {
      title: 'Категория работ',
      dataIndex: 'category',
      width: '30%',
      key: 'category',
      filters: setFilterSelectsHelper(categories),
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
  ]

  return [...cols, ...arr]
}

//hardcoded date filters on year
const date_filters = ['2018', '2019', '2020', '2021', '2022']
  .map((value) => ({
    value,
    text: value,
  }))
  .reverse()

// //hardcoded date filters on year v2.0
// const year = [2018, 2019, 2020, 2021, 2022]
// const month = [
//   'Январь',
//   'Февраль',
//   'Март',
//   'Апрель',
//   'Май',
//   'Июнь',
//   'Июль',
//   'Август',
//   'Сентябрь',
//   'Октябрь',
//   'Ноябрь',
//   'Декабрь',
// ]

// const date_filters = [
//   {
//     value: 'year',
//     text: 'year',
//     children: year.map((value) => ({ value, text: value })),
//   },
//   {
//     value: 'month',
//     text: 'month',
//     children: month.map((value) => ({ value, text: value })),
//   },
// ]
