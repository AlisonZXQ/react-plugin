import React from 'react';
import uuid from 'uuid';
import { Upload, message, Row, Col, Spin, Popconfirm, Popover, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { equalsObj, getHumanSize } from '@utils/helper';
import MyIcon from '@components/MyIcon';
import link from '@assets/link.png';
import uploadIcon from '@assets/upload-cloud.png';
import { ATTACHMENT_TYPE_MAP, ATTCHEMENT_TYPE_MAP, pictureTypeArr } from '@shared/CommonConfig';

import './index.less';

const { Dragger } = Upload;

export class Index extends React.Component {
  state = {
    fileList: [],
    loading: false,
    isList: false,
  };

  componentDidMount() {
    const { defaultValue } = this.props;
    if (defaultValue) {
      this.setState({ fileList: defaultValue });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fileList } = this.state;

    const nextValue = nextProps.value;

    if (!equalsObj(fileList || [], nextValue || [])) {
      this.setState({ fileList: nextValue });
    }
  }

  customRequest = (option) => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('file', option.file);
    this.setState({ loading: true });
    uploadFile(formData).then(res => {
      this.setState({ loading: false });
      if (res.code !== 200) return message.error(res.msg);
      if (res.result) {
        const obj = {
          id: uuid(),
          ...res.result,
          type: ATTACHMENT_TYPE_MAP.BLOB
        };
        const newFileList = [...fileList];
        newFileList.push(obj);
        this.setState({ fileList: newFileList });
        if (this.props.handleSave) { // 更新
          this.props.handleSave(res.result);
        } else { // 创建
          this.props.onChange(newFileList);
        }
      }
    }).catch((err) => {
      this.setState({ loading: false });
      return message.error(err || err.message);
    });
  }

  beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 40;
    if (!isLt2M) {
      message.error('单个文件必须小于40MB!');
    }
    return isLt2M;
  }

  handleClick = (id) => {
    const { fileList } = this.state;
    const newFileList = [...fileList];
    if (this.props.handleDelete) {
      this.props.handleDelete(id);
    } else {
      this.props.onChange(newFileList.filter(it => it.id !== id));
    }

    this.setState({
      fileList: newFileList.filter(it => it.id !== id)
    });
  }

  getDisplayList = (it) => {
    return (<span>
      <Col span={10}>
        <a href={it.url} target="_blank" rel="noopener noreferrer">{it.name}</a>
        {it.type === ATTACHMENT_TYPE_MAP.BLOB ?
          <span className={`f-tal f-ib u-mgl10 displayListSize`}>
            ({getHumanSize(it.size)})
          </span>
          : <span>&nbsp;</span>
        }
      </Col>
      <Col span={14}>
        <span className='f-fr'>

          {it.type === ATTACHMENT_TYPE_MAP.BLOB ?
            <a onClick={(e) => { e.stopPropagation(); this.handleDownload(it) }}>下载</a>
            : ''
          }

          {
            <Popconfirm
              title="确定删除该附件吗?"
              onConfirm={() => this.handleClick(it.id)}
              okText="确定"
              cancelText="取消"
            >
              {it.type === ATTACHMENT_TYPE_MAP.BLOB ? <Divider type="vertical" /> : ''}
              <span className='delColor f-csp'>删除</span>
            </Popconfirm>
          }
        </span>
      </Col>

    </span>);
  }

  getDisplayNotList = (it) => {
    return (
      <a href={it.url} target="_blank" rel="noopener noreferrer">
        <li className="li">
          <span className={"container"}>
            <div className={"imgStyle"}>
              {it.dboxId &&
                <MyIcon type='icon-D-BOX' style={{ fontSize: '26px' }} />
              }
              {!it.dboxId && it.type === ATTCHEMENT_TYPE_MAP.LINK &&
                <MyIcon type='icon-link1' style={{ fontSize: '26px' }} />
              }
              {!it.dboxId && it.type === ATTCHEMENT_TYPE_MAP.BINARY &&
                <img
                  src={
                    pictureTypeArr.includes(it.suffix) ?
                      `${it.url}?imageView&thumbnail=400x300` : link}
                  alt={it.name}
                />
              }
            </div>
            <div className='f-aic' style={{ height: '30px' }}>
              <Popover content={it.dboxId ? `${it.name}${it.suffix ? '.' + it.suffix : ''}` : it.name} trigger="hover">
                <span className={`f-toe ${"name"}`}>
                  {it.dboxId ? `${it.name}${it.suffix ? '.' + it.suffix : ''}` : it.name}
                </span>
              </Popover>
            </div>
          </span>
          <div style={{ marginTop: '4px' }} className="f-fs1">
            {it.type === ATTACHMENT_TYPE_MAP.BLOB ?
              <span className={"size"}>
                {getHumanSize(it.size)}
              </span>
              : <span>&nbsp;</span>
            }

            <span className="f-fr">
              {it.type === ATTACHMENT_TYPE_MAP.BLOB ?
                <a
                  onClick={(e) => { e.stopPropagation(); this.handleDownload(it) }}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: '6px' }}
                >下载
                </a>
                : ''
              }

              <Popconfirm
                title="确定删除该附件吗?"
                onConfirm={() => this.handleClick(it.id)}
                okText="确定"
                cancelText="取消"
              >
                <a className="delColor">删除</a>
              </Popconfirm>
            </span>
          </div>
        </li>
      </a>);
  }

  handleDownload = (it) => {
    if (it.dboxId) {
      window.open(it.url);
    } else {
      window.open(`/rest/download/attachment?url=${it.url}&name=${it.name}`);
    }
  }

  validFunction4Url = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    const urlValue = getFieldValue('url');
    if (urlValue) {
      if (!/^(http:\/\/|https:\/\/)/.test(urlValue)) {
        callback('地址必须以http://或https://为前缀');
      }
      else {
        callback();
      }
    }
    else {
      callback();
    }
  }

  createButton = () => {
    return (
      <div
        className={"createButton"}>
        <PlusOutlined className='u-mgr10' />
        添加附件
      </div>
    );
  }

  render() {
    const { fileList, loading, isList } = this.state;

    return (<div className={"container"}>
      {
        <Spin spinning={loading} tip="文件上传中">
          <div className={"uploadC"}>
            <Dragger
              beforeUpload={this.beforeUpload}
              className={"dragger"}
              customRequest={this.customRequest}
              showUploadList={false}
            >
              <div className={"upload"}>
                <img src={uploadIcon} alt="upload" className={"icon"} />
                <span className={"text"}>点击或将文件拖拽到这里上传，单个文件不超过40M。 </span>
              </div>
            </Dragger>
          </div>
        </Spin>
      }

      {
        !!fileList.length &&
        <div className="f-tar u-mgt10 u-mgb10">
          <a
            className={!isList ? "default" : ''}
            onClick={() => this.setState({ isList: true })}>
            <MyIcon type="icon-liebiaozhanshi" className="f-csp" />
            <span className='u-mgl5'>列表</span>
          </a>
          <a
            className={`u-mgl10 ${isList ? "default" : ''}`}
            onClick={() => this.setState({ isList: false })}>
            <MyIcon type="icon-tupianzhanshi" className="f-csp" />
            <span className='u-mgl5'>缩略图</span>
          </a>
        </div>
      }
      {
        isList &&
        fileList.map(it => <Row className="u-mgt5">
          {this.getDisplayList(it)}
        </Row>)
      }
      {
        !isList &&
        fileList.map(it => <ul className="u-mgt5">
          {this.getDisplayNotList(it)}
        </ul>)
      }
    </div>);
  }
}

export default Form.create()(Index);
