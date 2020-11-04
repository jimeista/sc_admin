import React from 'react'
import { Tag } from 'antd'

export const setRoleColumns = (options) => {
  return [
    {
      title: 'Роль',
      dataIndex: 'role',
      width: '30%',
      editable: true,
      placeholder: 'Роли',
    },
    {
      title: 'Модули',
      dataIndex: 'modules',
      type: 'multi-select',
      editable: true,
      data: options,
      render: (modules) => (
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
      ),
    },
  ]
}

export const setRoleDataSource = (data) => {
  return data.map((i, index) => {
    return {
      key: index,
      role: i.role,
      modules: i.modules,
    }
  })
}
