//данные функии подстраивают data в структуру ant table
//некоторые данные могут иметь вложенную структуру в зависимости от выбранного типа справочника

//функиция возвращает структуру при выборе справочника "Все справочники"
export const setTableDefaultDataSource = (data) => {
  let arr = []
  data.forEach((i) => {
    if (i.name === 'Сфера' || i.name === 'Стратегия 2050') {
      //вложенность структуры
      i.options.forEach((ii) => {
        let ob = {
          key: ii.name,
          name: ii.name,
          tag: i.tag,
          children: ii.options.map((o) => ({
            key: `${ii.name}-${o.name}-${o.id}`,
            name: o.name,
            tag: ii.tag,
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

//функиция возвращает вложенную структуру отраслей при выборе справочника "Сфера" и "Стратегия 2050"
export const setTableFieldDataSource = (data, selected) => {
  let ob = data.find((i) => i.name === selected)

  let arr = []

  ob.options.forEach((i) => {
    let obb = {
      key: i.name,
      name: i.name,
      id: i.id,
      tag: i.tag,
      children: i.options.map((ii) => ({
        key: `${ii.name}-${ii.id}`,
        name: ii.name,
        id: ii.id,
        tag: ii.tag,
        'parent-id': i.id, //необходимо для post запроса
        'parent-name': i.name, //опционально, для dev mode
      })),
    }

    arr = [...arr, obb]
  })

  return arr
}

//функиция возвращает структуру при выборе весх типов справочника,кроме "Все справочники","Сфера","Стратегия 2050"
export const setTableOtherDataSource = (data, selected) => {
  let ob = data.find((i) => i.name === selected)
  let arr = ob.options.map((i) => ({
    key: i.name,
    name: i.name,
    id: i.id,
    tag: i.tag,
  }))

  return arr
}
