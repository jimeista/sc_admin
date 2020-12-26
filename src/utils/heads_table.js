import React from 'react'
import { Tag, Avatar } from 'antd'

//создаем наименования колонок под структуру antd table для руководителей
//функция принимает options для отображения опции при редактировании
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
      //при редактировании выпадает multiselect
      render: (tags) => {
        return (
          <span>
            {tags.map((tag, index) => {
              let color = tags.length > 3 ? 'geekblue' : 'green'
              return (
                <Tag
                  color={color}
                  // key={`${tag.split('-')[0]}-${index}`}
                  key={`${tag}-${index}`}
                  style={{ margin: '5px 5px' }}
                >
                  {/* {`${tag['abbreviation'].toUpperCase()} -
                    ${tag['full-name'].toUpperCase()}`} */}
                  {tag && tag.toUpperCase()}
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

//подгоняем data руководителей под структуру antd table
export const setDataSourceHelper = (data) =>
  data.map((i, index) => ({
    key: i['supervisor-id'],
    '#': ++index,
    'supervisor-id': i['supervisor-id'],
    name: i.name,
    position: i.position,
    'image-path': i['image-path'],
    //в колону "курируемые организации" передается массив аббревиатур
    'supervised-organisations': i['supervised-organisations'].map(
      (o) => o.abbreviation
    ),
  }))
