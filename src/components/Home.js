import React, { useState, useEffect } from 'react'

import SideNavMenu from './SideNavMenu'
import MainContentWrapper from './MainContentWrapper'

const Home = ({ children }) => {
  let [width, setWidth] = useState(window.innerWidth)

  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth())
    }
    // set resize listener
    window.addEventListener('resize', resizeListener)

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return (
    <div
      className='App Admin_main_style'
      style={{ display: width < 600 ? 'block' : 'flex' }}
    >
      <SideNavMenu width={width} />
      <MainContentWrapper>
        <div
          style={{ width: '100%', margin: '20px auto', padding: 5 }}
          className='Admin_main_style_content'
        >
          {children}
        </div>
      </MainContentWrapper>
    </div>
  )
}

export default React.memo(Home)
