
//'use client';
//import React, { useState } from 'react';
import './stx-logo.css'; // 记得创建这个 CSS 文件

export default function StxLogo() {
  // 保持原始数据命名
  //const [isLeftEyeMove, setIsLeftEyeMove] = useState(false);
  //const [isBlink, setIsBlink] = useState(false);
  
  
  const isLeftEyeMove = false;
  const isBlink = false;
  

  return (
    <div className="stx-logo-container">
      <div className="stx-logo-icon">
        
        {/* 第一部分：顶部天线 (Section 1) */}
        <div className="stx-logo-top">
          <div 
            className="stx-antenna stx-antenna-left" 
            data-move={isLeftEyeMove}
          >
            <div className="stx-wire stx-wire-left" data-move={isLeftEyeMove}></div>
            <div className="stx-round-head"></div>
          </div>
          
          <div className="stx-antenna stx-antenna-right">
            <div className="stx-wire stx-wire-right"></div>
            <div className="stx-round-head"></div>
          </div>
        </div>

        {/* 第二部分：眼部主体 (Section 2) */}
        <div className="stx-logo-middle">
          <div className="stx-body-center">
            <div className="stx-eye stx-eye-left" data-move={isLeftEyeMove}>
              <div className="stx-eye-pupil" data-blink={isBlink}></div>
            </div>
            <div className="stx-eye stx-eye-right" data-move={isLeftEyeMove}>
              <div className="stx-eye-pupil" data-blink={isBlink}></div>
            </div>
          </div>
        </div>

        {/* 第三部分：底部 (Section 3) */}
        <div className="stx-logo-bottom">
          <div className="stx-bottom-bar"></div>
        </div>

      </div>
    </div>
  );
}