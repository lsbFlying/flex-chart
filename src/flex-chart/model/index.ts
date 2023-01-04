import { RefObject } from "react";
import { FlexChartICSS } from "./icss";
import { EChartOption } from "echarts"; // todo 暂时@types/echarts没有跟进到echarts最新5.x的版本，后续及时跟进更新类型
import { EChartsType } from "../index";

export interface FlexChartProps<DataItem extends FlexChartDataItem> extends FlexChartICSS {
  /**
   * @description 数据源
   *
   * @default []
   */
  data: DataItem[];
  /** 数据data的字段对应属性名 */
  fieldNames?: FieldNames;
  /** 系列数据类型，默认是bar柱类型系列 */
  seriesTypes?: SeriesTypes | SeriesTypes[];
  /** 如果单纯是要设置line系列的数据，不想通过series的数组设置的话则可以统一设置 */
  lineSeries?: EChartOption.SeriesLine;
  /** 如果单纯是要设置bar系列的数据，不想通过series的数组设置的话则可以统一设置 */
  barSeries?: EChartOption.SeriesBar;
  /**
   * @description 是否开启容器尺寸变化监听，页面resize的话容器自然也会可能触发容器的resize
   * 所以监听容器的resize更彻底准确，但是一般而言页面布局可能没有那么复杂
   * 所以不需要额外内存监听容器尺寸的变化，节省内存开销
   * 且该resize监听同时会触发setOption重新调整边界尺寸的计算，所以还是比较沉重的
   * 所以一般而言无复杂情况业务则不需要开启resizeObserver
   */
  autoResize?: boolean;
  /** echarts的配置参数(echarts官方文档上的配置项) */
  options?: EChartOption;
  /** echarts初始化参数配置 */
  initOpts?: EchartsInitOpts;
  /** 初始化的样式主题 */
  initTheme?: string | object;
  /** 图表加载，加载参数是图表实例，并且会随着实例的销毁重建而更新 */
  onChartLoad?(chartsInstance: EChartsType): void;
  /** 事件绑定 */
  onEvents?: FlexChartEventsType;
  /**
   * @description 方向(垂直/水平/垂直反向/水平反向)，非echarts初始化时的主题设置，而是FlexChart本身的主题配置
   * 权重级别比option低，即如果option里面的配置影响了布局尺寸设置
   * 会以option为主，direction的方向配置可能会失效，因为本身direction的方向设置是根据echarts的option实现的
   *
   * @default vertical
   */
  direction: FlexChartDirection;
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

export interface FlexChartEventsType {
  click?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  dblclick?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  mousedown?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  mousemove?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  mouseup?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  mouseover?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  mouseout?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  globalout?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
  contextmenu?: FlexChartEventsFuncTypeHandle | FlexChartEventsFuncType;
}

export type FlexChartEventsFuncTypeHandle = (
  params: EventParams,
  chartsInstance: EChartsType,
) => void;

export type EventParams = {
  type: string;
  encode: {
    x: number[];
    y: number[];
  };
  dimensionNames: ("x" | "y")[];
  // 当前点击的图形元素所属的组件名称，
  // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
  componentType: string;
  componentSubType: string;
  // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
  seriesType: string;
  // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
  seriesIndex: number;
  seriesId: string;
  // 系列名称。当 componentType 为 'series' 时有意义。
  seriesName: string;
  // 数据名，类目名
  name: string | number;
  // 数据在传入的 data 数组中的 index
  dataIndex: number;
  // 传入的原始数据项
  data: Object;
  // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
  // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
  // 其他大部分图表中只有一种 data，dataType 无意义。
  dataType?: string;
  // 传入的数据值
  value: number | string | (number | string)[];
  // 数据图形的颜色。当 componentType 为 'series' 时有意义。
  color: string;
  borderColor?: string;
  // 用户自定义的数据。只在 graphic component 和自定义系列（custom series）
  // 中生效，如果节点定义上设置了如：{type: 'circle', info: {some: 123}}。
  info?: any;
  event: HandleEvent;
};

/** todo 部分属性不确定用any */
export type HandleEvent = {
  cancelBubble: boolean;
  event: PointerEvent;
  gestureEvent?: any;
  offsetX: number;
  offsetY: number;
  pinchScale?: any;
  pinchX?: any;
  pinchY?: any;
  stop: Function;
  target: any;
  topTarget: any;
  type: "click";
  wheelDelta: number;
  which: number;
  zrByTouch?: any;
};

/** flex-chart图表的风格方向 */
export type FlexChartDirection = "vertical" | "horizontal" | "verticalInverse" | "horizontalInverse";

// 尺寸变化类型
export interface ResizeObserverType {
  /** 监听 */
  observe(target: Element): void;
  /** 解除监听 */
  unobserve(target: Element): void;
  /** 取消连接 */
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

export interface FieldNames {
  name?: string;
  data?: string;
  dataName?: string;
  dataValue?: string;
}

/**
 * @description 想着数据格式不参染样式设置，所以这里没有设置为echarts的series的数据类型包含symbol，label等各种设置
 * 做了一个单纯的数据抽象，抽离出需要的纯数据或者纯对象数据
 */
export interface FlexChartDataItem {
  /** 系列名 */
  name: string | number;
  /** 该系列数据 */
  data: FlexChartDataObject[];
}

export interface EchartsInitOpts {
  devicePixelRatio?: number;
  renderer?: "canvas" | "svg";
  width?: number | string | null;
  height?: number | string | null;
  useDirtyRect?: boolean; // 从 `5.0.0` 开始支持
  ssr?: boolean;          // 从 `5.3.0` 开始支持
  locale?: string;        // 从 `5.0.0` 开始支持
}

export type SeriesTypes = "bar" | "line";

export type FlexChartEventsFuncType = {
  /**
   * query 可为 string 或者 Object。
   * 如果为 string 表示组件类型。格式可以是 'mainType' 或者 'mainType.subType'。例如：
   * chart.on('click', 'series', function() {});
   * chart.on('click', 'series.line', function() {});
   * chart.on('click', 'dataZoom', function() {});
   * chart.on('click', 'xAxis.category', function() {});
   *
   * 如果为 Object，可以包含以下一个或多个属性，每个属性都是可选的：
   * {
   *   ${mainType}Index: number // 组件 index
   *   ${mainType}Name: string // 组件 name
   *   ${mainType}Id: string // 组件 id
   *   dataIndex: number // 数据项 index
   *   name: string // 数据项 name
   *   dataType: string // 数据项 type，如关系图中的 'node', 'edge'
   *   element: string // 自定义系列中的 el 的 name
   * }
   *
   * 例如：
   * chart.setOption({
   *   // ...
   *   series: [
   *     {
   *       name: 'uuu'
   *       // ...
   *     }
   *   ]
   * });
   * chart.on('mouseover', { seriesName: 'uuu' }, function() {
   *   // series name 为 'uuu' 的系列中的图形元素被 'mouseover' 时，此方法被回调。
   * });
   *
   * 例如：
   * chart.setOption({
   *    // ...
   *    series: [
   *     {
   *       // ...
   *     },
   *     {
   *       // ...
   *       data: [
   *         { name: 'xx', value: 121 },
   *         { name: 'yy', value: 33 }
   *       ]
   *     }
   *   ]
   * });
   *  chart.on('mouseover', { seriesIndex: 1, name: 'xx' }, function() {
   *    // series index 1 的系列中的 name 为 'xx' 的元素被 'mouseover' 时，此方法被回调。
   *  });
   *
   * 例如：
   * chart.setOption({
   *   // ...
   *   series: [
   *     {
   *       type: 'graph',
   *       nodes: [
   *         { name: 'a', value: 10 },
   *         { name: 'b', value: 20 }
   *       ],
   *       edges: [{ source: 0, target: 1 }]
   *     }
   *   ]
   * });
   * chart.on('click', { dataType: 'node' }, function() {
   *   // 关系图的节点被点击时此方法被回调。
   * });
   * chart.on('click', { dataType: 'edge' }, function() {
   *   // 关系图的边被点击时此方法被回调。
   * });
   *
   * 例如：
   * chart.setOption({
   *   // ...
   *   series: {
   *     // ...
   *     type: 'custom',
   *     renderItem: function(params, api) {
   *       return {
   *         type: 'group',
   *         children: [
   *           {
   *             type: 'circle',
   *             name: 'my_el'
   *             // ...
   *           },
   *           {
   *             // ...
   *           }
   *         ]
   *       };
   *     },
   *     data: [[12, 33]]
   *   }
   * });
   * chart.on('mouseup', { element: 'my_el' }, function() {
   *   // name 为 'my_el' 的元素被 'mouseup' 时，此方法被回调。
   * });
   *
   * 你可以在回调函数中获得这个对象中的数据名、系列名称后在自己的数据仓库中索引得到其它的信息后更新图表，显示浮层等等，如下示例代码：
   * myChart.on('click', function(parmas) {
   *  $.get('detail?q=' + params.name, function(detail) {
   *    myChart.setOption({
   *       series: [
   *         {
   *           name: 'pie',
   *           // 通过饼图表现单个柱子中的数据分布
   *           data: [detail.data]
   *         }
   *       ]
   *     });
   *   });
   * });
   */
  query?: string | Object;
  handle: FlexChartEventsFuncTypeHandle;
};

export * from "./icss";
