import {RefObject} from "react";
import {AxisChartICSS} from "./icss";
import {EChartOption} from "echarts";

export * from "./icss";

export interface AxisChartProps extends AxisChartICSS {
  /** 数据源 */
  data: AxisChartData[];
  /** 类目轴数据 */
  categoryData?: (string | number)[];
  /**
   * 数据源的data数组的类型是AxisChartDataItem类型还是(number | string)类型
   * 为true则是(number | string)类型，false则是AxisChartDataItem类型
   */
  pureData?: boolean;
  /**
   * 是否开启容器尺寸变化监听，页面resize的话容器自然也会可能触发容器的resize
   * 所以监听容器的resize更彻底准确，但是一般而言页面布局可能没有那么复杂
   * 所以不需要额外内存监听容器尺寸的变化，节省内存开销
   */
  resizeObserver?: boolean;
  /** echarts的配置参数(echarts官方文档上的配置项) */
  option?: EChartOption;
  /** echarts初始化参数配置 */
  // initOpts?: EChartsInitOpts;
  /**
   * 主题(垂直/水平/垂直反向/水平反向)
   * 权重级别比option低，即如果option里面的配置影响了布局尺寸设置
   * 会以option为主，theme的主题配置会失效
   */
  theme: "vertical" | "horizontal" | "verticalInverse" | "horizontalInverse";
  /**
   * 是否合并echarts配置项
   * 默认true合并，但是合并会影响图表数据渲染的准确性
   * 所以需要时设置为false不合并->保证每次都是最新的配置项即可
   */
  mergeOption: boolean;
  /**
   * autoFit自适应计算尺寸是在没有scale缩放页面屏幕的情况下使用
   * 外部props也可以控制是否禁用autoFit的适配尺寸计算
   * 比如有scale缩放的时候即禁用，或者别的业务逻辑的情况下使用等等
   */
  autoFit: boolean;
}

// 尺寸变化类型
export interface ResizeObserverType {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

export interface AxisChartState {
  containerRef: RefObject<HTMLElement>;
}

export interface AxisChartDataItem {
  /** 数据项名称 */
  name: string | number;
  /** 单个数据项的数值 */
  value: number | string | null;
}

export interface AxisChartData {
  /** 系列名 */
  name: string | number;
  /** 该系列数据 */
  data: AxisChartDataItem[] | (number | string | null)[];
}
