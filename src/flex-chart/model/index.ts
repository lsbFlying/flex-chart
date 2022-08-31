import {RefObject} from "react";
import {FlexChartICSS} from "./icss";
import {EChartOption} from "echarts";

export interface FlexChartProps extends FlexChartICSS {
  /**
   * 系列数据类型，默认是bar柱类型系列
   */
  seriesTypes?: SeriesTypes | SeriesTypes[];
  /**
   * @description 数据源
   *
   * @default []
   */
  data: FlexChartData[];
  /** 类目轴数据 */
  categoryData?: (string | number)[];
  /**
   * 是否开启容器尺寸变化监听，页面resize的话容器自然也会可能触发容器的resize
   * 所以监听容器的resize更彻底准确，但是一般而言页面布局可能没有那么复杂
   * 所以不需要额外内存监听容器尺寸的变化，节省内存开销
   */
  resizeObserver?: boolean;
  /**
   * echarts的配置参数(echarts官方文档上的配置项)
   * todo 暂时@types/echarts没有跟进到echarts最新5.x的版本，后续及时跟进更新类型
   */
  options?: EChartOption;
  /**
   * echarts初始化参数配置
   * todo 暂时@types/echarts没有跟进到echarts最新5.x的版本，后续及时跟进更新类型
   */
  initOpts?: echartsInitOpts;
  /**
   * @description 主题(垂直/水平/垂直反向/水平反向)
   * 权重级别比option低，即如果option里面的配置影响了布局尺寸设置
   * 会以option为主，theme的主题配置会失效
   *
   * @default vertical
   */
  theme: FlexChartTheme;
  /**
   * @description 是否合并echarts配置项
   * 默认true合并，合并会提高渲染的效率，但是合并会影响图表数据渲染的准确性
   * 所以必要时需要设置为false不合并->保证每次都是最新的配置项来保证数据渲染的准确性即可
   *
   * @default true
   */
  mergeOption: boolean;
  /**
   * @description autoFit自适应计算尺寸是在没有scale缩放页面屏幕的情况下使用
   * 外部props也可以控制是否禁用autoFit的适配尺寸计算
   * 比如有scale缩放的时候即禁用，或者别的业务逻辑的情况下使用等等
   *
   * @default false
   */
  autoFit: boolean;
}

export type FlexChartTheme = "vertical" | "horizontal" | "verticalInverse" | "horizontalInverse";

// 尺寸变化类型
export interface ResizeObserverType {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

export interface FlexChartState {
  containerRef: RefObject<HTMLElement>;
}

export type FlexChartDataValue = number | string | null | undefined;

export interface FlexChartDataObject {
  /** 数据项名称 */
  name: string | number;
  /** 单个数据项的数值 */
  value: FlexChartDataValue;
}

/**
 * @description 想着数据格式不参染样式设置，所以这里没有设置为echarts的series的数据类型包含symbol，label等各种设置
 * 做了一个单纯的数据抽象，抽离出需要的纯数据或者纯对象数据
 */
export interface FlexChartData {
  /** 系列名 */
  name: string | number;
  /** 该系列数据 */
  data: FlexChartDataObject[] | FlexChartDataValue[];
}

export interface echartsInitOpts {
  devicePixelRatio?: number;
  renderer?: "canvas" | "svg";
  width?: number | string | null;
  height?: number | string | null;
  useDirtyRect?: boolean; // 从 `5.0.0` 开始支持
  ssr?: boolean;          // 从 `5.3.0` 开始支持
  locale?: string;        // 从 `5.0.0` 开始支持
}

export type SeriesTypes = "bar" | "line";

export * from "./icss";
