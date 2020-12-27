import React from 'react'

import { Tabs } from 'antd'

// компонента рендерит кастомные табы
export const CustomTabs = ({ tabs }) => {
  const { TabPane } = Tabs

  const renderTabs = () => {
    return tabs ? (
      <Tabs type='card' className='tabs'>
        {tabs.map((i, index) => (
          <TabPane tab={i.title} key={index}>
            {i.child}
          </TabPane>
        ))}
      </Tabs>
    ) : (
      'no tabs data to render'
    )
  }

  return <div className='card-container'>{renderTabs()}</div>
}
