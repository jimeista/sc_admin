export const setTableColumns = (data, key) => {
  let names = [
    'Государственная программа',
    'Единица измерения',
    'Ответственный орган',
    'Источник информации',
    'Отрасль',
    'Периодичность обновления',
  ]

  names = [...names, key]

  return [
    {
      title: 'Индикатор',
      dataIndex: 'name',
      width: '20%',
      editable: true,
      sorter: (a, b) => strcmp(b.name, a.name),
      sortDirections: ['ascend'],
    },
    ...names.map((name) => {
      let filters = []
      if (name === 'Отрасль') {
        let field = data.find((i) => i.name === 'Сфера')
        let strategy = data.find((i) => i.name === 'Стратегия 2050')

        filters = [
          ...field.options.map((o) => ({
            text: o.name,
            value: o.name,
            id: o.id,
          })),
          ...strategy.options.map((o) => ({
            text: o.name,
            value: o.name,
            id: o.id,
          })),
        ]
      } else {
        filters = data
          .filter((i) => i.name === name)
          .map((ii) => ii.options.map((o) => ({ text: o.name, value: o.name })))
      }

      filters = [].concat(...filters)

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

export const setTableData = (data) => {
  return data.map((i) => {
    let dictionaries = {}
    Object.keys(i.dictionaries).forEach((key) => {
      dictionaries = {
        ...dictionaries,
        [key]: i.dictionaries[key],
        key: i.name,
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

export const strcmp = (a, b) => {
  if (a === b) {
    return 0
  }

  if (a > b) {
    return 1
  }

  return -1
}
