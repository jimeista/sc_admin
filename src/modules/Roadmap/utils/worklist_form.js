import React from 'react'
import {
  Upload,
  message,
  Button,
  Input,
  Checkbox,
  DatePicker,
  Form,
  Select,
} from 'antd'
// import { Collapse } from 'react-collapse'

import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'

const { TextArea } = Input
const { Option } = Select

export const renderSelects = (prop) => {
  const { regions, organisations, categories } = prop
  const arr = [
    {
      name: 'category',
      placeholder: 'Категоря работ',
      options:
        categories.status === 'success'
          ? categories.data.map((r) => r.name)
          : [],
    },
    {
      name: 'organisation',
      placeholder: 'Ответсвенный орган',
      options:
        organisations.status === 'success'
          ? organisations.data.map((o) => o.name)
          : [],
    },
    {
      name: 'region',
      placeholder: 'Район',
      options:
        regions.status === 'success' ? regions.data.map((r) => r.name) : [],
    },
  ]

  return (
    <div
    // style={{
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   justifyContent: 'space-between',
    //   margin: '15px 0',
    // }}
    >
      {arr.map((i, index) => (
        <Form.Item
          name={i.name}
          rules={[{ required: true, message: 'Заполните поле' }]}
          key={`${i.name}${index}`}
          hasFeedback
        >
          <Select placeholder={i.placeholder} style={{ width: 300 }} allowClear>
            {i.options.map((op) => (
              <Option value={op} key={op}>
                {op}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ))}
    </div>
  )
}

export const renderTextArea = (name, placeholder, isOpen) => {
  return (
    <Form.Item>
      <Form.Item
        name={name}
        valuePropName={'value'}
        hidden={name !== 'area' && !isOpen}
        rules={
          name !== 'area' && isOpen
            ? [{ required: true, message: 'Заполните поле' }]
            : []
        }
        getValueFromEvent={(e) => e.target.value}
      >
        <TextArea style={{ height: 70 }} placeholder={placeholder} allowClear />
      </Form.Item>
    </Form.Item>
  )
}

export const renderDatePicker = (picker, handleChange, name, text) => {
  const picker_ = picker ? (
    <DatePicker
      placeholder='Выбрать год'
      allowClear={false}
      picker={'year'}
      format={'YYYY'}
    />
  ) : (
    <DatePicker placeholder='Выбрать дату' allowClear={false} />
  )

  return (
    <Form.Item label={text}>
      <Input.Group compact>
        <Form.Item
          name={name}
          rules={[{ required: true, message: 'Заполните поле' }]}
          getValueFromEvent={(e, string) => {
            return moment(string, 'YYYY-MM-DD')
          }}
        >
          {picker_}
        </Form.Item>
        <Form.Item
          name={`is-${name}`}
          style={{ marginLeft: 10 }}
          valuePropName={'checked'}
          getValueFromEvent={(e) => e.target.checked}
        >
          <Checkbox onChange={handleChange}>Год</Checkbox>
        </Form.Item>
      </Input.Group>
    </Form.Item>
  )
}

export const renderUpload = () => (
  <Form.Item
    name='file-paths'
    valuePropName='fileList'
    // getValueFromEvent={normFile}
  >
    <Upload {...upload_props}>
      <Button icon={<UploadOutlined />}>Добавить рисунок / презентацию</Button>
    </Upload>
  </Form.Item>
)

export const upload_props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} успешно загружен`)
    } else if (info.file.status === 'error') {
      message.error(`Ошибка загрузки файла ${info.file.name}`)
    }
  },
}

const normFile = (e) => {
  console.log('Upload event:', e)

  if (Array.isArray(e)) {
    return e
  }

  return e && e.fileList
}
