import React from 'react'
import { Tag } from 'antd'

//создаем наименования колонок под структуру antd table для роль модулей
//функция принимает options для отображения опции при редактировании
export const setRoleColumns = (options) => {
  return [
    {
      title: '№',
      dataIndex: '№',
      align: 'center',
      width: '2%',
    },
    {
      title: 'Роль',
      dataIndex: 'repr',
      width: '30%',
      editable: true,
      placeholder: 'Роли',
    },
    {
      title: 'Модули',
      dataIndex: 'permitted-modules',
      type: 'multi-select',
      editable: true,
      data: options,
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
  ]
}

//подгоняем data роль модулей под структуру antd table
export const setRoleDataSource = (data) => {
  return data.map((i, index) => {
    return {
      key: i.id,
      '№': ++index,
      repr: i.repr,
      'permitted-modules': i['permitted-modules'].map(
        (i) => i['permitted-module']
      ),
      modules: i['permitted-modules'],
    }
  })
}
