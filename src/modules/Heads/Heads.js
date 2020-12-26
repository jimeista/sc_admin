import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getHeads } from '../../features/heads/headsSlice'

import HeadsTable from './HeadsTable'
import HeadsModal from './HeadsModal'

const Heads = () => {
  const { organisationList, config } = useSelector((state) => state.admin)
  const { status, data } = useSelector((state) => state.heads)
  const dispatch = useDispatch()

  useEffect(() => {
    //главная страница руководителей
    //делаем get запрос списка руководителей при инициализации компоненты если пользователь авторизовался
    config && data.length === 0 && dispatch(getHeads(config))
  }, [data, config, dispatch])

  return (
    <div>
      <HeadsModal organisations={organisationList} />
      <HeadsTable
        organisations={organisationList}
        data={data}
        status={status}
      />
    </div>
  )
}

export default withRouter(Heads)
