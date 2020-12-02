export const setIndicatorColumns = () => {
  return [
    {
      title: 'Индикатор',
      dataIndex: 'name',
      width: '30%',
      editable: true,
      sorter: (a, b) => strcmp(b.name, a.name),
      sortDirections: ['ascend'],
    },
    // {
    //   title: 'Государственная программа',
    //   dataIndex: 'Государственная программа',
    // },
    {
      title: 'Единица измерения',
      dataIndex: 'Единица измерения',
      align: 'center',
    },
    {
      title: 'Источник информации',
      dataIndex: 'Источник информации',
      align: 'center',
    },
    // {
    //   title: 'Ответственный орган',
    //   dataIndex: 'Ответственный орган',
    // },
    {
      title: 'Отрасль',
      dataIndex: 'Отрасль',
      align: 'center',
    },
    {
      title: 'Периодичность обновления',
      dataIndex: 'Периодичность обновления',
      align: 'center',
    },
    {
      title: 'Сфера',
      dataIndex: 'Сфера',
      align: 'center',
    },
  ]
}

export const setIndicatorData = (data) => {
  return data.map((i) => {
    let dictionaries = {}
    Object.keys(i.dictionaries).forEach((key) => {
      dictionaries = { ...dictionaries, [key]: i.dictionaries[key] }
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
