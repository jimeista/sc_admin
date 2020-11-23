import React from 'react'
import { AppContextProvider } from './context/main'

import { Tabs } from 'antd'
import { Card, Indicator, AdminTabs } from './components/common'

export const CustomIndicatorInfo = () => {
  const { TabPane } = Tabs

  return (
    <>
      <AppContextProvider>
        <AdminTabs position={'top'}>
          <TabPane tab='Панель администратора' key='1'>
            <Card>
              <Indicator isLink={true} />
            </Card>
          </TabPane>
          <TabPane tab='Индикатор стратегии' key='2'>
            <Card>
              <Indicator isStrategy={true} isLink={true} />
            </Card>
          </TabPane>
        </AdminTabs>
      </AppContextProvider>
    </>
  )
}
