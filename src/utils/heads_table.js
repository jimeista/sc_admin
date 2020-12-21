import React from 'react'
import { Tag, Avatar } from 'antd'

export const setColumnsHelper = (options) => {
  return [
    {
      title: '№',
      dataIndex: '#',
      width: '2%',
      align: 'center',
    },

    {
      title: 'Должность',
      dataIndex: 'position',
      width: '25%',
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Курируемые организации',
      dataIndex: 'supervised-organisations',
      width: '35%',
      type: 'multi-select',
      editable: true,
      data: options,
      render: (tags) => {
        return (
          <span>
            {tags.map((tag, index) => {
              let color = tags.length > 3 ? 'geekblue' : 'green'
              return (
                <Tag
                  color={color}
                  key={`${tag.split('-')[0]}-${index}`}
                  style={{ margin: '5px 5px' }}
                >
                  {/* {`${tag['abbreviation'].toUpperCase()} -
                    ${tag['full-name'].toUpperCase()}`} */}
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </span>
        )
      },
    },
    {
      title: 'Фото',
      dataIndex: 'image-path',
      width: '10%',
      align: 'center',
      // editable: true,
      render: (path) => {
        return <Avatar size='large' src={path} />
      },
    },
  ]
}

export const setDataSourceHelper = (data) =>
  data.map((i, index) => ({
    key: i['supervisor-id'],
    '#': ++index,
    'supervisor-id': i['supervisor-id'],
    name: i.name,
    position: i.position,
    'image-path': i['image-path'],
    'supervised-organisations': i['supervised-organisations'].map(
      (o) => o.abbreviation
    ),
  }))
