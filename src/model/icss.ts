import React from "react";

/**
 * 样式props
 * created by liushanbao
 * @author liushanbao
 */
export interface FlexChartICSS {
  /** html id name */
  id?: string;
  /** html class name */
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  /** 样式 */
  style?: React.CSSProperties;
}

export interface LoadingOption {
  /** loading显示的文本 */
  text?: string;
  /** loading显示的文本颜色 */
  textColor?: string;
  /** loading文本的字体大小 */
  fontSize?: number | string;
  /** loading文本的字体 */
  fontWeight?: number | string;
  /** loading文本的字体 */
  fontStyle?: string;
  /** loading文本的字体 */
  fontFamily?: string;
  /** loading的圈圈颜色 */
  color?: string;
  /** loading蒙层背景色 */
  maskColor?: string;
  /** loading的层级 */
  zlevel?: number;
  /** 是否显示loading圈圈的旋转动画 */
  showSpinner?: boolean;
  /** loading圈圈旋转动画的圆角 */
  spinnerRadius?: number;
  /** loading圈圈的宽度 */
  lineWidth?: number;
}
