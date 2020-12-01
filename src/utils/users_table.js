import React from 'react'
import { Tag } from 'antd'

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
      data: organisations,
    },
    {
      title: 'Роль',
      dataIndex: 'roles',
      editable: true,
      placeholder: 'Роль',
      type: 'multi-select',
      data: roles,
      notRequired: false,
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
      title: 'Модули',
      dataIndex: 'modules',
      editable: true,
      placeholder: 'Модули',
      type: 'multi-select',
      data: modules,
      notRequired: false,
      render: (tags) => {
        return (
          <span>
            {tags.map((tag) => {
              let color = tag.length > 3 ? 'blue' : 'geekblue'
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

export const setDataSourceHelper = (data) => {
  return data.map((i, index) => {
    return {
      key: i['account-id'],
      '№': ++index,
      name: i.name,
      organisation: `${i.organisation['full-name']} - ${i.organisation.abbreviation}`,
      roles: i.roles.map((role) => role),
      modules: i.modules ? i.modules : [], //draft
      username: i.username,
      'account-id': i['account-id'],
    }
  })
}
