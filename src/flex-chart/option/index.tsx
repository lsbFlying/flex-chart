/**
 * x、y轴、图例legend、tooltip、bar柱/line线的symbol点上的label字体的默认字体大小
 * 相关数据之所以设置最小默认值12是因为大部分浏览器最小像素值的文本数据值就是12px
 * 尽管有些浏览器可以支持到最小字体像素值是10px，但是这里仍然以大部分浏览器为主
 */
export const defaultFontSize = 12;

// 图例相关配置
export const legendConfig = {
  // 整个legend的内边距
  padding: 0,
  // 图例每一项之间的距离（横向布局时为水平间隔，纵向布局时为纵向间隔）
  itemGap: 10,
  // 图例标记的图形宽度
  itemWidth: 25,
  // 图例标记的图形高度
  itemHeight: 14,
};

// 图例标记的图形与图例文本之间的距离经过我精确推算是5
export const legendIconTextDis = 5;

// 部分距离偏移，如图例底部的margin距离，x、y轴的轴字体与轴线之间的margin距离等等
export const offsetMargin = 8;
