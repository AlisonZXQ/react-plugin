import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import AddComponent from './pages/submit_feedback';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './styles/global.less';

class AddFeedback extends Component {

  render() {
    return (<ConfigProvider
      locale={zhCN}
    >
      <AddComponent
        trigger={<span>提交反馈</span>}
      />
    </ConfigProvider>)
  }
}

module.exports = AddFeedback
