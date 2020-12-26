import React from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { Form, DatePicker, Select, InputNumber, Space, Button } from 'antd'

import { postIndicatorInfoPopUp } from '../../features/indicatorinfo/indicatorinfoSlice'

//компонента управления формы показателей индикатора
//данная компонента реализует post запрос формы
const IndicatorInfoControllers = ({ name, record }) => {
  const [form] = Form.useForm()
  const { Option } = Select

  const dispatch = useDispatch()

  //post запрос данных по новому показателю индикатора
  const onSubmit = async () => {
    let record_ = await form.validateFields()

    //сохраняем значения с формы record до post запроса
    let date = moment(record_.date, 'YYYY').format('YYYY')
    let num = record_['num']
    let month = record_['month']

    //структура объекта отправки post запроса на сервер
    const data = {
      date: month ? `${date}-${month}-15` : `${date}-12-31`,
      'edit-comment': '',
      fact: name === 'Факт' ? num : null,
      planned: name === 'План' ? num : null,
    }

    dispatch(
      postIndicatorInfoPopUp({
        id: record.id,
        data,
        'last-edit': moment().format('YYYY-MM-DD'),
      })
    )
    form.resetFields()
  }

  //отрисовка формы:
  //календарь (год), селект выбора (месяц), поле ввода план|факта
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
          <DatePicker
            placeholder='Год'
            allowClear={false}
            locale={locale}
            picker={'year'}
          />
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

//hardcoded дата
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

//конфигурация своиства ant datepicker на рус яз
const locale = {
  lang: {
    locale: 'ru',
    placeholder: 'Выбрать дату',
    today: 'Сегодня',
    now: 'Сейчас',
    ok: 'ок',
    clear: 'очистить',
    month: 'Месяц',
    year: 'Год',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: false,
  },
  timePickerLocale: {
    placeholder: 'Выбрать время',
  },
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
}
