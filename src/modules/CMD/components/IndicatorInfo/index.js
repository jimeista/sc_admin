import React from 'react'

import { Controllers } from './Controllers'
import { IndicatorInfoTable as Table } from './IndicatorInfoTable'

export const IndicatorInfo = ({ plan, isStrategy }) => {
  return (
    <div className='Controllers_style'>
      <Controllers plan={plan} />
      <Table plan={plan} isStrategy={isStrategy} />
    </div>
  )
}
