import React from 'react'
import { Tag } from 'antd'

//создаем наименования колонок под структуру antd table для пользователей
//функция принимает options,roles для отображения опции при редактировании
export const setColumnsHelper = (organisations, roles, modules) => {
  return [
    {
      title: '№',
      dataIndex: '№',
      align: 'center',
      width: '2%',
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      editable: true,
      placeholder: 'ФИО',
    },
    {
      title: 'Организация',
      dataIndex: 'organisation',
      editable: true,
      placeholder: 'Организация',
      type: 'select',
      data: organisations.map((value) => ({ value })),
    },
    {
      title: 'Роль',
      dataIndex: 'roles',
      editable: true,
      placeholder: 'Роль',
      type: 'multi-select',
      data: roles,
      // рендерим мультиселект в таблице
      render: (tags) => {
        return (
          <span>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'blue'
              return (
                <Tag color={color} key={tag} style={{ margin: '5px 5px' }}>
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </span>
        )
      },
    },
    {
      title: 'Логин',
      dataIndex: 'username',
      editable: true,
      placeholder: 'Логин',
    },
  ]
}

//подгоняем data роль модулей под структуру antd table
export const setDataSourceHelper = (data) => {
  return data.map((i, index) => {
    return {
      key: i['account-id'],
      '№': ++index,
      name: i.name,
      organisation: `${i.organisation['full-name']} - ${i.organisation.abbreviation}`,
      roles: i.roles.map((role) => role),
      username: i.username,
      'account-id': i['account-id'],
    }
  })
}
