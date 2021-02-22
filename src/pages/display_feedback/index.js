import React, { useState } from 'react';
import { Table, Radio, Input, Button, Modal } from 'antd';
import ViewImage from '@components/ViewImage';
import SubmitFeedback from '../submit_feedback';
import './index.less';

const { Search } = Input;

function DisplayFeedback() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState('list'); // list是反馈列表，detail是详情
  const [record, setRecord] = useState({});

  const data = [{
    id: 1,
    dianzan: 10,
    date: '2020-10-10 15:00',
    title: '标题一标题一标题一标题一------',
    description: '描述一描述一描述一',
    img: 10,
    state: 1,
  }, {
    id: 2,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 3,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 4,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 5,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 6,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 7,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 2,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 8,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 9,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }, {
    id: 10,
    dianzan: 20,
    date: '2020-10-10 15:00',
    title: '标题二标题二标题二标题二标题二------',
    description: '描述eerrer描述一描述一',
    img: 20,
    state: 2,
  }]

  const columns = [{
    title: '',
    dataIndex: 'dianzan',
  }, {
    title: '',
    dataIndex: 'date',
  }, {
    title: '',
    dataIndex: 'title',
  }, {
    title: '',
    dataIndex: 'img',
  }, {
    title: '',
    dataIndex: 'state',
  }];

  const onChange = () => {

  }

  const getList = () => {
    return (<span>
      <div className="f-jcsb-aic">
        <Radio.Group onChange={() => onChange()} defaultValue="a">
          <Radio.Button value="a">改进建议</Radio.Button>
          <Radio.Button value="b">问题反馈</Radio.Button>
        </Radio.Group>

        <span>
          <Search
            style={{ width: '300px' }}
            placeholder="搜索内容"
          />
          <span onClick={() => setVisible(false)}>
            <SubmitFeedback
              trigger={<Button type="primary" className="u-mgl10">提交建议</Button>}
              defaultTab={1}
            />
          </span>

        </span>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        showHeader={false}
        size="small"
        className="u-mgt10"
        onRow={(record) => {
          return {
            className: 'f-csp',
            onClick: () => {
              setCurrent('detail');
              setRecord(record);
            }
          }
        }}
      />
    </span>)
  }

  const getDetail = () => {
    return (<span>
      <div className="f-jcsb-aic">
        <span className="title">{record.title}</span>
        <span>{record.dianzan}</span>
      </div>
      <div>
        {record.description}
      </div>
      <div>
        <ViewImage />
      </div>
    </span>)
  }

  const getTitle = () => {
    if (current === 'list') {
      return '用户声音';
    } else if (Object.keys(record).length) {
      return <span className="header">
        <span onClick={() => setCurrent('list')} className="backToList f-csp">-用户声音</span>
        <span>{record.title}</span>
      </span>
    }
  }

  return <div>
    <span className="f-csp" onClick={() => setVisible(true)}>用户声音</span>
    <Modal
      title={getTitle()}
      visible={true}
      onCancel={() => setVisible(false)}
      width={1000}
      footer={null}
      maskClosable={false}
      className="container"
    >
      {current === 'list' && getList()}
      {current === 'detail' && getDetail()}
    </Modal>
  </div>
}

export default DisplayFeedback;
