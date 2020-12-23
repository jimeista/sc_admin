export const setTableDefaultDataSource = (data) => {
  let arr = []
  data.forEach((i) => {
    if (i.name === 'Сфера') {
      i.options.forEach((ii) => {
        let ob = {
          key: ii.name,
          name: ii.name,
          children: ii.options.map((o) => ({
            key: `${ii.name}-${o.name}-${o.id}`,
            name: o.name,
          })),
        }

        arr = [...arr, ob]
      })
    } else if (i.name !== 'Сфера' && i.name !== 'Тип') {
      arr = [
        ...arr,
        {
          key: i.name,
          name: i.name,
          children: i.options.map((ii) => ({
            key: `${i.name}-${ii.name}-${ii.id}`,
            name: ii.name,
          })),
        },
      ]
    }
  })

  return arr
}

export const setTableUniqueDataSource = (data, selected) => {
  let ob = data.find((i) => i.name === selected)

  let arr = []

  ob.options.forEach((i) => {
    let obb = {
      key: i.name,
      name: i.name,
      id: i.id,
      children: i.options.map((ii) => ({
        key: ii.name,
        name: ii.name,
        id: ii.id,
      })),
    }

    arr = [...arr, obb]
  })

  return arr
}

export const setTableOtherDataSource = (data, selected) => {
  let ob = data.find((i) => i.name === selected)
  let arr = ob.options.map((i) => ({
    key: i.name,
    name: i.name,
    id: i.id,
  }))

  return arr
}
