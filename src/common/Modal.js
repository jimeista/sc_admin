import React from 'react'
import { Modal, Button } from 'antd'

export default class CustomModal extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { btntext, btnstyle, title, children } = this.props
    return (
      <>
        <Button type='primary' onClick={this.showModal} style={btnstyle}>
          {btntext}
        </Button>
        <Modal
          title={title}
          width='50%'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className='Leaders_style_modal'
        >
          {children}
        </Modal>
      </>
    )
  }
}
