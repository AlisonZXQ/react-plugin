import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Viewer from 'react-viewer';
import './index.less';

function ViewImage({
  // imageSrc,
  // richValue,
}) {
  const [container, setContainer] = useState(null);
  const richValue = `默认值<br /><img src="http://easyproject.nos-jd.163yun.com/d7e76e87e0cd4089ba69825f26cea97e.png" width="401" height="181" /><br /><br /><img src="http://easyproject.nos-jd.163yun.com/8378962f10ed42c089af8659705e0037.png" />`;

  const imageSrc = 'http://easyproject.nos-jd.163yun.com/8378962f10ed42c089af8659705e0037.png';

  const getAllImageHref = (content) => {
    let hrefArrExceptCurrent = [];
    // 匹配img元素
    const _img = /<img\b.*?(?:\>|\/>)/gi;
    content.replace(_img, (str) => {
      // 获取img的href元素
      const _href = /\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
      const newStr = _href.exec(str);
      const href = newStr[1];
      if (!href.includes(imageSrc)) {
        hrefArrExceptCurrent.push({
          src: href,
          alt: href,
        });
      }
    });
    return hrefArrExceptCurrent;
  };

  return (<div>
    <div ref={refs => setContainer(refs)}></div>
    <Viewer
      visible={true}
      noClose={true}
      className="view"
      container={container}
      images={[{ src: imageSrc, alt: imageSrc }, ...getAllImageHref(richValue)]}
    />
  </div>);
}

export default ViewImage;
