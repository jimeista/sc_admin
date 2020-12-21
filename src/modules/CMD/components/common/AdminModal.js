import React, { useContext, useEffect } from 'react'
import { Modal, Tabs } from 'antd'
import { AppContext } from '../../context/main'
import { getAPI } from '../../utils/api'

import { AdminTabs } from './AdminTabs'
import { IndicatorInfo } from '../IndicatorInfo'

export const AdminModal = ({ open, setOpen }) => {
  const { modalIndicator, setFetchedIndicatorInfoData } = useContext(AppContext)

  useEffect(() => {
    if (modalIndicator) {
      getAPI(
        `/sc-analytic-indicators/api/indicators/${modalIndicator.id}/indexes`
      ).then((res) =>
        setFetchedIndicatorInfoData((state) => ({
          ...state,
          data: res.data,
          loading: false,
        }))
      )
    }
  }, [modalIndicator])

  const { TabPane } = Tabs

  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <Modal
      title={modalIndicator && modalIndicator.name}
      visible={open}
      width={'auto'}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      className='AdminModal_style'
    >
      <AdminTabs position={'top'}>
        <TabPane tab={'План'} key='1'>
          <IndicatorInfo plan={'План'} />
        </TabPane>
        <TabPane tab={'Факт'} key='2'>
          <IndicatorInfo plan={'Факт'} />
        </TabPane>
      </AdminTabs>
    </Modal>
  )
}
