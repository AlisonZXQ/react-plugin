import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import DisplayComponent from './pages/display_feedback';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './styles/global.less';

class DisplayFeedback extends Component {

  render() {
    return (<ConfigProvider
      locale={zhCN}
    >
      <DisplayComponent />
    </ConfigProvider>)
  }
}

module.exports = DisplayFeedback
