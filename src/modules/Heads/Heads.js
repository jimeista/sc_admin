import React, { useState, useMemo, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import HeadsTable from './HeadsTable'
import HeadsModal from './HeadsModal'

const Heads = () => {
  const { organisationList } = useSelector((state) => state.admin)

  return (
    <div>
      <HeadsModal organisations={organisationList} />
      <HeadsTable organisations={organisationList} />
    </div>
  )
}

export default withRouter(Heads)
