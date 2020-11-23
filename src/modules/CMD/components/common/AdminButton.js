import React from 'react'
import { Button } from 'antd'

export const AdminButton = ({
  handleAdd,
  text2,
  text1,
  text3,
  style = {
    margin: '5 0',
  },
  text = `+`,
}) => {
  const handleClick = () => handleAdd()
  const renderBTN = (text1, text2, text3) => {
    if (text1) {
      return (
        <Button
          type='primary'
          onClick={handleClick}
          style={style}
          className='AdminButton_style'
          title={text1}
        >
          {text}
        </Button>
      )
    }

    if (text2) {
      return (
        <Button
          type='primary'
          onClick={handleClick}
          style={style}
          className='AdminButton_style'
          title={text2}
        >
          {text}
        </Button>
      )
    }
    if (text3) {
      return (
        <Button
          type='primary'
          onClick={handleClick}
          style={style}
          className='AdminButton_style'
          title={text3}
        >
          {text}
        </Button>
      )
    }
  }
  return renderBTN(text1, text2, text3)
  /* text2 ? <Button type='primary' onClick={handleClick} style={style} className='AdminButton_style' title={text2}>
            {text}
        </Button> : <Button type='primary' onClick={handleClick} style={style} className='AdminButton_style' title={text1}>
            {text}
        </Button>*/
}
