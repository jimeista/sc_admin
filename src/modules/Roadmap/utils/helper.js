export const nameEnToRuWorkListHelper = (name) => {
  switch (name) {
    case 'area':
      return 'Участок'
    case 'address':
      return 'Адрес/улица'
    case 'contractor':
      return 'Подрядчик'
    case 'category':
      return 'Категоря работ'
    case 'end-date':
      return 'Дата окончания'
    case 'start-date':
      return 'Дата начала'
    case 'closure-descr':
      return 'Описание перекрытия'
    case 'organisation':
      return 'Ответсвенный орган'
    case 'file-paths':
      return 'Файл'
    case 'lot-name':
      return 'Лот'
    case 'percentage':
      return 'Статус исполнения (%)'
    case 'region':
      return 'Район'
    case 'supervisor-name':
      return 'ФИО руководителя'
    case 'contacts':
      return 'Контакты'
    case 'warranty-period':
      return 'Гарантийный период'
    case 'canvas-descr':
      return 'Описание вскрытия'
    case 'company-name':
      return 'Наименование компании'
    case 'canceled-comment':
      return 'Комментарий закупа отмены'
    case 'percentage-comment':
      return 'Комментарий статуса %'
    case 'is-hidden':
      return 'Статус скрыт'
    case 'is-canceled':
      return 'Статус приостановлен'
    case 'commentary':
      return 'Статус комментария'
    default:
      return name
  }
}

export const prepareToShowDetailsObToArr = (ob) => {
  const arr = []

  Object.keys(ob).map((key) => {
    if (
      typeof ob[key] !== 'undefined' &&
      typeof ob[key] !== 'object' &&
      typeof ob[key] !== 'boolean' &&
      key !== 'key' &&
      key !== 'id'
    ) {
      arr.push({ name: key, value: ob[key] })
    }
  })

  return arr
}

export const findLotName = (id, data) =>
  //should return lot-name not id
  data.find((i) => i.id === id).id

export const postNewRoadWork = (data, categories, organisations, regions) => {
  let ob = {}
  // console.log(data, data['percentage'])
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      if (
        key !== 'is-hidden' ||
        key !== 'is-canceled' ||
        key !== 'commentary'
      ) {
        if (key === 'end-date' || key === 'start-date') {
          data[key].length > 4
            ? (ob = { ...ob, [key]: data[key] })
            : (ob = { ...ob, [key]: `${data[key]}-01-01` })
        } else if (key === 'category') {
          const id = categories.data.find((o) => o.name === data[key]).id
          ob = { ...ob, [key]: id }
        } else if (key === 'organisation') {
          const id = organisations.data.find((o) => o.name === data[key]).id
          ob = { ...ob, [key]: id }
        } else if (key === 'region') {
          const id = regions.data.find((o) => o.name === data[key]).id
          ob = { ...ob, [key]: id }
        } else if (key === 'percentage') {
          const obb = {
            percentage: data[key],
            'is-hidden': data['is-hidden'],
            'is-canceled': data['is-canceled'],
            commentray: data.commentary,
          }

          let new_obb = {}

          Object.keys(obb).forEach((o) => {
            if (obb[o] !== undefined) {
              new_obb = { ...new_obb, [o]: obb[o] }
            }
          })

          ob = { ...ob, status: new_obb }
        } else {
          ob = { ...ob, [key]: data[key] }
        }
      }
    }
    if (key === 'is-canvas-opened' || key === 'is-closured') {
      ob = { ...ob, [key]: false }
    }
  })

  return ob
}
