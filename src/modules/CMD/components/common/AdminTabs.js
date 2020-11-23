import React from 'react'
import { Tabs } from 'antd'

export const AdminTabs = (props) => {
  return (
    <Tabs
      defaultActiveKey='1'
      tabPosition={props.position || 'left'}
      className={props.classname || 'Indicators_tab_style'}
    >
      {props.children}
    </Tabs>
  )
}
