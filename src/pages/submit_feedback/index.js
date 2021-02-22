import React, { Component, useState } from 'react';
import { Button, Modal, Row, Col, Form, Input, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import MyIcon from '@components/MyIcon';
import UploadFiles from '@components/UploadFiles';
import './index.less';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: { span: 18 },
};

const { TextArea } = Input;

function SubmitFeedback({ trigger }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('advise');

  const handleChange = (type) => {
    setActive(type);
    props.form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      console.log('values', values);
    }).catch(err => {
      console.log('err', err)
    })
  }

  return (<ConfigProvider
    locale={zhCN}
  >
    <span className="f-csp" onClick={() => setVisible(true)}>{trigger}</span>
    <Modal
      title="提交反馈"
      visible={visible}
      width={800}
      onOk={() => handleOk()}
      onCancel={() => setVisible(false)}
      destroyOnClose
    >
      <Row>
        <Col span={3}>
          <span className='f-fr'>场景类型：</span>
        </Col>
        <Col span={20}>
          <span
            className={`selectCard ${active === 'advise' ? "activeSelect" : ''}`}
            onClick={() => handleChange('advise')}>
            <div>
              <MyIcon type='icon-jianyi' className={"icon"} />
              <span className="title">创建建议</span>
            </div>
            <span className="content">产品的功能与体验改进建议</span>
          </span>
          <span
            className={`selectCard ${active === 'ticket' ? "activeSelect" : ''}`}
            onClick={() => handleChange('ticket')}>
            <div>
              <MyIcon type='icon-gongdan' className={"icon"} />
              <span className={"title"}>创建工单</span>
            </div>
            <span className={"content"}>产品使用过程中遇到的问题</span>
          </span>
        </Col>
      </Row>

      <Form
        {...layout}
        form={form}
        name="dynamic_rule"
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="图片"
          name="content"
        >
          <UploadFiles form={form} />
        </Form.Item>
      </Form>
    </Modal>
  </ConfigProvider>)
}

module.exports = SubmitFeedback
