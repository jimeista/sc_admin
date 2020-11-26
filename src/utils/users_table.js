import React from 'react'
import { Tag } from 'antd'

export const setColumnsHelper = (organisations, roles) => {
  return [
    {
      title: '№',
      dataIndex: '№',
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
      type: 'multi-select',
      data: organisations,
      render: (modules) => {
        return (
          <span>
            {modules.map((module) => {
              let color = module.length < 5 ? 'geekblue' : 'blue'
              return (
                <Tag color={color} key={module} style={{ margin: '5px 5px' }}>
                  {module.toUpperCase()}
                </Tag>
              )
            })}
          </span>
        )
      },
    },
    {
      title: 'Роль',
      dataIndex: 'roles',
      editable: true,
      placeholder: 'Роль',
      type: 'multi-select',
      data: roles,
      render: (modules) => {
        return (
          <span>
            {modules.map((module) => {
              let color = module.length > 5 ? 'geekblue' : 'blue'
              return (
                <Tag color={color} key={module} style={{ margin: '5px 5px' }}>
                  {module.toUpperCase()}
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
      key: i.name,
      '№': ++index,
      name: i.name,
      organisation: [
        `${i.organisation['full-name']} - ${i.organisation.abbreviation}`,
      ],
      roles: i.roles.map((role) => role),
      username: i.username,
    }
  })
}
