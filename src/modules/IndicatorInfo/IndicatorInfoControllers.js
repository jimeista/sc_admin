import React from 'react'
import moment from 'moment'
import { Form, DatePicker, Select, InputNumber, Space, Button } from 'antd'

const IndicatorInfoControllers = ({ name }) => {
  const [form] = Form.useForm()
  const { Option } = Select

  const onSubmit = async () => {
    let record = await form.validateFields()

    form.resetFields()
    console.log(moment(record.date, 'YYYY-MM-DD').format('YYYY-MM-DD'))
  }

  return (
    <Form form={form} style={{ width: '100%', display: 'flex' }}>
      <Space direction='horizontal'>
        <Form.Item
          name={'date'}
          rules={[{ required: true, message: 'Заполните поле' }]}
          getValueFromEvent={(e, string) => {
            return moment(string, 'YYYY-MM-DD')
          }}
        >
          <DatePicker placeholder='Год' allowClear={false} />
        </Form.Item>
        <Form.Item name={'month'} style={{ width: 150, overflow: 'hidden' }}>
          <Select placeholder='Месяц'>
            {month.map((i) => (
              <Option value={i.id} key={`${i.value}-${i.id}`}>
                {i.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={'num'}>
          <InputNumber min={0} placeholder={name} />
        </Form.Item>
        <Form.Item>
          <Button type={'primary'} onClick={onSubmit}>
            Добавить
          </Button>
        </Form.Item>
      </Space>
    </Form>
  )
}

export default React.memo(IndicatorInfoControllers)

const month = [
  { id: '01', title: 'Январь', value: 'Январь' },
  { id: '02', title: 'Февраль', value: 'Февраль' },
  { id: '03', title: 'Март', value: 'Март' },
  { id: '04', title: 'Апрель', value: 'Апрель' },
  { id: '05', title: 'Май', value: 'Май' },
  { id: '06', title: 'Июнь', value: 'Июнь' },
  { id: '07', title: 'Июль', value: 'Июль' },
  { id: '08', title: 'Август', value: 'Август' },
  {
    id: '09',
    title: 'Сентябрь',
    value: 'Сентябрь',
  },
  {
    id: '10',
    title: 'Октябрь',
    value: 'Октябрь',
  },
  { id: '11', title: 'Ноябрь', value: 'Ноябрь' },
  {
    id: '12',
    title: 'Декабрь',
    value: 'Декабрь',
  },
]
