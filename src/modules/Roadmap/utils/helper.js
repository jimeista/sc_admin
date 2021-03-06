//translate server variables' naming to show on client
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
    case 'is-end-date':
      return 'Дата окончания отмечено'
    case 'start-date':
      return 'Дата начала'
    case 'is-start-date':
      return 'Дата начало отмечено'
    case 'closure-description':
      return 'Описание перекрытия'
    case 'is-closured':
      return 'Описание перекрытия отмечено'
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
    case 'canvas-description':
      return 'Описание вскрытия'
    case 'is-canvas-opened':
      return 'Описание вскрытия отмечено'
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

//validate antd form before post|put requests
export const prepareToShowDetailsObToArr = (ob) => {
  const arr = []

  Object.keys(ob).map((key) => {
    if (key === 'start-date') {
      arr.push({
        name: key,
        value: ob['is-start-date'] ? `${ob[key]}-01-01` : ob[key],
      })
    } else if (key === 'end-date') {
      arr.push({
        name: key,
        value: ob['is-end-date'] ? `${ob[key]}-12-31` : ob[key],
      })
    } else if (
      typeof ob[key] !== 'undefined' &&
      typeof ob[key] !== 'object' &&
      key !== 'is-start-date' &&
      key !== 'is-end-date' &&
      key !== 'key' &&
      key !== 'id'
    ) {
      arr.push({ name: key, value: ob[key] })
    } else if (ob[key] === undefined && key.split('-')[0] === 'is') {
      arr.push({ name: key, value: false })
    } else if (ob[key] === undefined) {
      arr.push({ name: key, value: null })
    }
  })

  return arr
}

//configure client to server data format
export const validateRoadWorkForm = (
  data,
  categories,
  organisations,
  regions
) => {
  let ob = {}
  let is_hidden = false
  let is_canceled = false
  let commentary = null
  let percentage

  data.forEach((item) => {
    if (
      item.name !== 'is-hidden' ||
      item.name !== 'is-canceled' ||
      item.name !== 'commentary' ||
      item.name !== 'percentage' ||
      item.name !== 'is-end-date' ||
      item.name !== 'is-start-date'
    ) {
      //save status values
      if (item.name === 'percentage') {
        percentage = item.value
      }
      if (item.name === 'is-canceled') {
        is_canceled = item.value
      }
      if (item.name === 'is-hidden') {
        is_hidden = item.value
      }
      if (item.name === 'commentary') {
        commentary = item.value
      }
      //find id for item.names
      else if (item.name === 'category') {
        const id = categories.data.find((o) => o.name === item.value).id
        ob = { ...ob, [item.name]: id }
      } else if (item.name === 'organisation') {
        const id = organisations.data.find((o) => o.name === item.value).id
        ob = { ...ob, [item.name]: id }
      } else if (item.name === 'region') {
        const id = regions.data.find((o) => o.name === item.value).id
        ob = { ...ob, [item.name]: id }
      } else {
        ob = { ...ob, [item.name]: item.value }
      }
    }
  })

  ob = {
    ...ob,
    status: {
      percentage: percentage,
      'is-hidden': is_hidden,
      'is-canceled': is_canceled,
      commentary: commentary,
    },
  }

  return ob
}

//
export const setCoordinates = (data) => {
  return data.map((i) => {
    let arr = []
    if (i.type === 'polyline') {
      arr = i.coordinates.map((ii) => ({ y: ii[1], x: ii[0] }))
    } else if (i.type === 'polygon') {
      arr = i.coordinates[0].map((k) => ({ y: k[1], x: k[0] }))
    } else {
      arr = [{ y: i.coordinates[1], x: i.coordinates[0] }]
    }
    return arr
  })
}
