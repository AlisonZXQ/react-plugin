import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';

const InitialIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1520787_k2f4xsdsto.js',
});

const MyIcon = ({ type, style, className, ...others }) =>
  (<InitialIcon {...others} type={type} style={style} className={`${className}`} />);

export default MyIcon;
