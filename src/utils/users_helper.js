//вспомогательная функция возвращает объекты для отправки на сервер и обновления клиента
export const onRequest = (record, roles, organisations, modules) => {
  //структура отправки данных на сервер
  let post = {
    name: record.name,
    'organisation-id': organisations.find(
      (o) => o.value === record.organisation
    ).id,
    username: record.username,
    password: record.password ? record.password : '',
    roles: roles.filter((i) => record.roles.includes(i.value)).map((i) => i.id),
    modules: record.modules
      ? modules.filter((i) => record.modules.includes(i.value)).map((i) => i.id)
      : [],
  }

  //структура отрисовки данных на клиенте
  record = {
    ...record,
    organisation: {
      abbreviation: record.organisation.split('-')[1],
      'full-name': record.organisation.split('-')[0],
    },
  }

  return { post, record }
}
