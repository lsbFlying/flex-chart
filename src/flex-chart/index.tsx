import React from "react";
import * as echarts from "echarts";
import ResizeObserver from "resize-observer-polyfill";
import merge from "lodash.merge";
import isEqual from "fast-deep-equal";
import {
  EventParams, FlexChartDataItem, FlexChartDataItemBasic, FlexChartDataObject, FlexChartEventsFuncType,
  FlexChartEventsFuncTypeHandle, FlexChartProps, FlexChartState, ResizeObserverType,
} from "./model";
import {
  defaultFontSize, offsetMargin, legendConfig, legendIconTextDis,
} from "./option";
import { convertNumToThousand, exactCalcStrFontCount, fit } from "./utils";

export type EChartsType = echarts.ECharts;

/**
 * FlexChart
 * @author: liushanbao<1262300490@qq.com>
 * @extends React.PureComponent
 * @class FlexChart
 * @description 封装echarts的自动化布局处理的灵活图表，目前主要针对line与bar系列类型
 */
export class FlexChart<P extends FlexChartDataItemBasic> extends React.PureComponent<FlexChartProps<P>, FlexChartState> {
  
  static defaultProps = {
    data: [],
    direction: "vertical",
    mergeOption: true,
    autoFit: false,
  };
  
  state: FlexChartState = {
    containerRef: React.createRef<HTMLElement>(),
  };
  
  /** 图表实例 */
  private chartsInstance: EChartsType | null = null;
  /** 外层容器尺寸变化容器监听的事件实例 */
  private chartResizeObserver: ResizeObserverType | null = null;
  
  async componentDidMount() {
    const { autoResize } = this.props;
    const { containerRef } = this.state;
    await this.createNewChartInstance();
    if (autoResize) {
      this.chartResizeObserver = new ResizeObserver(() => {
        (this.chartsInstance as EChartsType).resize();
        this.handleChartOption();
      });
      this.chartResizeObserver.observe(containerRef.current as Element);
    } else {
      this.handleChartOption();
    }
  }
  
  async componentDidUpdate(prevProps: Readonly<FlexChartProps<P>>) {
    const { initTheme, initOpts, onEvents } = this.props;
    const { initTheme: prevInitTheme, initOpts: prevInitOpts, onEvents: prevOnEvents } = prevProps || {};
    /**
     * 以下属性修改的时候，需要 dispose 之后再新建
     * 1. 切换样式主题 initTheme 的时候
     * 2. 修改初始化配置 initOpts 的时候
     * 3. 修改图表事件绑定 onEvents 的时候
     */
    if (
      prevProps && (
        !isEqual(initOpts, prevInitOpts)
        || !isEqual(initTheme, prevInitTheme)
        || !isEqual(onEvents, prevOnEvents)
      )
    ) {
      this.chartsInstance?.dispose();
      await this.createNewChartInstance();
    }
    this.renderOption(prevProps);
  }
  
  componentWillUnmount() {
    const { containerRef } = this.state;
    (this.chartsInstance as EChartsType).dispose();
    this.chartResizeObserver?.unobserve(containerRef.current as Element);
  }
  
  render() {
    const { id, className, style } = this.props;
    const { containerRef } = this.state;
    return (
      <div
        ref={containerRef as any}
        id={id}
        className={className}
        style={{ width: "100%", height: "100%", ...style }}
      />
    );
  }
  
  /** 处理更新渲染 */
  renderOption = (prevProps: Readonly<FlexChartProps<P>>) => {
    const {
      autoFit, mergeOption, direction, options, data, autoResize, lineSeries, barSeries,
    } = this.props;
    const {
      autoFit: prevAutoFit, mergeOption: prevMergeOption, direction: prevDirection, options: prevOptions,
      data: prevData, autoResize: prevAutoResize,
      lineSeries: prevLineSeries, barSeries: prevBarSeries
    } = prevProps;
    if (
      data !== prevData || lineSeries !== prevLineSeries || barSeries !== prevBarSeries
      || options !== prevOptions || direction !== prevDirection || autoFit !== prevAutoFit
      || mergeOption !== prevMergeOption || autoResize !== prevAutoResize
    ) {
      fit.autoFit = autoFit;
      this.handleChartOption();
    }
  }
  
  /** 创建新的图表实例 */
  createNewChartInstance = async () => {
    const { initTheme, initOpts, onEvents, onChartLoad } = this.props;
    const { containerRef } = this.state;
    this.chartsInstance = echarts.init(
      containerRef.current as HTMLDivElement | HTMLCanvasElement,
      initTheme,
      // todo 暂时@types/echarts没有跟进到echarts最新5.x的版本，后续及时跟进更新类型
      initOpts as any,
    );
    onChartLoad?.(this.chartsInstance as EChartsType);
    for (const eventName in onEvents) {
      if (Object.prototype.hasOwnProperty.call(onEvents, eventName)) {
        // @ts-ignore
        const item: FlexChartEventsFuncType = onEvents[eventName];
        if (item.query) {
          this.chartsInstance?.on(eventName, item.query, (params: EventParams) => {
            item.handle(params, this.chartsInstance as EChartsType);
          });
        } else {
          this.chartsInstance?.on(eventName, (params: EventParams) => {
            !item.handle
              ? (item as any as FlexChartEventsFuncTypeHandle)(params, this.chartsInstance as EChartsType)
              : item.handle(params, this.chartsInstance as EChartsType);
          });
        }
      }
    }
  }
  
  /** 图表参数配置 */
  handleChartOption = () => {
    const { mergeOption } = this.props;
    (this.chartsInstance as EChartsType).setOption(this.genDefaultOption(), !mergeOption);
  }
  
  /**
   * 默认配置项
   * 主要针对grid以及各种边界的距离处理
   */
  genDefaultOption = (): any => {
    const { direction, data, fieldNames, options, seriesTypes, lineSeries, barSeries } = this.props;
    const chartWidth = (this.chartsInstance as EChartsType).getWidth();
    
    /**
     * 如果外界没有给出类目数据，则会默认遍历map处理找出类目轴数据，
     * 此时如果遇到大数据则会耗时，不建议，所以尽量在遇到大数据的情况下给出类目数据
     */
    // @ts-ignore
    const categoryDataArray = (data[0]?.[fieldNames?.data || "data"] as FlexChartDataObject[])
      // @ts-ignore
      .map(item => item?.[fieldNames?.dataName || "name"]);
    
    const isVertical = direction.includes("vertical");
    
    let maxLongSeriesNameCount = 0;
    let maxValue = 0;
    const seriesNames: string[] = [];
    // @ts-ignore
    const seriesData = data.map((item: FlexChartDataItem, index: number) => {
      // @ts-ignore
      const res = `${item?.[fieldNames?.name || "name"]}`;
      seriesNames.push(res);
      maxLongSeriesNameCount = Math.max(exactCalcStrFontCount(res), maxLongSeriesNameCount);
      // @ts-ignore
      const curDataMax = Math.max(...((item?.[fieldNames?.data || "data"] as FlexChartDataObject[])
      // @ts-ignore
      .map(item1 => item1?.[fieldNames?.dataValue || "value"]) as number[]));
      maxValue = Math.max((curDataMax as number) || 0, maxValue);
      
      const type = seriesTypes
        ? typeof seriesTypes === "string"
          ? seriesTypes
          : (seriesTypes?.[index] || "bar")
        : "bar";
      
      const otherOption = options?.series?.[index] || (type === "line" ? lineSeries : barSeries);
      
      // @ts-ignore
      const itemData = item?.[fieldNames?.data || "data"];
      return {
        ...item,
        data: !isVertical ? itemData.reverse() : itemData,
        type,
        ...otherOption,
      };
    });
    
    // 先合并，然后取合并值配置或者无配置则按默认配置处理
    const chartOptions = merge({
      tooltip: {
        confine: true,
      },
      series: seriesData,
    }, options);
    
    if (direction === "verticalInverse") {
      chartOptions.xAxis = merge({ position: "top" }, chartOptions.xAxis);
      chartOptions.yAxis = merge({ inverse: true }, chartOptions.yAxis);
    }
  
    if (direction === "horizontalInverse") {
      chartOptions.xAxis = merge({ inverse: true }, chartOptions.xAxis);
      chartOptions.yAxis = merge({ position: "right" }, chartOptions.yAxis);
    }
    
    const chartOptionValueAxis: any = chartOptions[isVertical ? "yAxis" : "xAxis"];
    
    const valueAxisNameFontSize = fit(chartOptionValueAxis?.nameTextStyle?.fontSize || defaultFontSize);
    const valueAxisName = chartOptionValueAxis?.name || "";
    
    // 值轴是否有设置上下(垂直时)或者左右(水平时)反向颠倒
    const valueAxisInverse = chartOptionValueAxis?.inverse;
    
    const valueAxisLabelFontSize = fit(chartOptionValueAxis?.axisLabel?.fontSize || defaultFontSize);
    
    /**
     * 类目轴添加轴名称或者单位的情况少之又少，
     * 这里暂时不考虑处理类目轴名称，后续看情况考虑是否添加
     */
    const valueAxisNameObj = valueAxisName
      ?
      {
        nameTextStyle: {
          fontSize: valueAxisNameFontSize,
          /**
           * 这个echarts的轴名称单位的水平对齐方式感觉有点反直觉，不知道是bug还是什么，
           * 但是好多个版本都一直如此，需要注意后续如果有版本改动为符合直觉的设置
           */
          align: "center",
        },
      }
      : {};
    
    const axisTickObj = {
      axisTick: {
        alignWithLabel: true,
      },
    };
    
    const xAxisObj = {
      xAxis: merge(isVertical
        ?
        {
          type: "category",
          boundaryGap: true,
          data: categoryDataArray,
          ...axisTickObj,
        }
        :
        {
          type: "value",
          ...valueAxisNameObj,
        }, chartOptions.xAxis),
    };
    
    const yAxisObj = {
      yAxis: merge(isVertical
        ?
        {
          type: "value",
          ...valueAxisNameObj,
        }
        :
        {
          type: "category",
          data: categoryDataArray.reverse(),
          ...axisTickObj,
        }, chartOptions.yAxis),
    };
  
    // legend的是否换行很难计算，所以干脆保持最宽泛的原始配置项
    const legendObj = {
      legend: merge(legendConfig, chartOptions?.legend),
    };
    legendObj.legend.padding = fit(legendObj.legend.padding);
    legendObj.legend.itemGap = fit(legendObj.legend.itemGap);
    legendObj.legend.itemWidth = fit(legendObj.legend.itemWidth);
    legendObj.legend.itemHeight = fit(legendObj.legend.itemHeight);
    
    const legendPadding = legendObj.legend.padding;
    const legendPaddingLeftRight = typeof legendPadding === "number"
      ? legendPadding
      : (legendPadding as number[]).length === 1
        ? legendPadding[0]
        : (legendPadding as number[]).length === 2 || (legendPadding as number[]).length === 3
          ? legendPadding[1]
          : legendPadding[1] + legendPadding[3];
    
    const legendNoPaddingWidth = legendObj.legend.width
      ? (
        `${legendObj.legend.width}`.includes("%")
          ? chartWidth * parseFloat(legendObj.legend.width as string) / 100
          : `${legendObj.legend.width}`.includes("px")
            ? Number(`${legendObj.legend.width}`.replace("", "px"))
            : 1
      ) - legendPaddingLeftRight
      : chartWidth - legendPaddingLeftRight;
    
    let legendRows = 1;
    const legendFontSize = fit(legendObj.legend.textStyle?.fontSize || defaultFontSize);
    if (legendObj.legend.orient !== "vertical") {
      // 每一行累计的legend的宽度
      let rowReduceLegendItemWidth = 0;
      // 精确算出legend在不实用滚动类型的情况下会换行换几行
      seriesNames.forEach((item, index, array) => {
        // 当前这个图例的宽度，不包含itemGap的距离
        const curLegendItemWidth = exactCalcStrFontCount(item)
          * legendFontSize
          + legendObj.legend.itemWidth + legendIconTextDis + legendObj.legend.itemGap;
    
        rowReduceLegendItemWidth += curLegendItemWidth;
    
        const nextItem = array[index + 1];
        // 包含itemGap
        const nextLegendItemWidth = nextItem
          ? exactCalcStrFontCount(nextItem) * legendFontSize
          + legendObj.legend.itemWidth + legendIconTextDis + legendObj.legend.itemGap
          : 0;
    
        // 真正的最终legend的宽度需要去除最后一个legend的右侧gap距离
        const zDiffWidth = rowReduceLegendItemWidth - legendObj.legend.itemGap;
        const condition = zDiffWidth > legendNoPaddingWidth
          || (zDiffWidth === legendNoPaddingWidth && index < (array.length - 1))
          || zDiffWidth > legendNoPaddingWidth
          || (zDiffWidth + nextLegendItemWidth) > legendNoPaddingWidth;
    
        if (condition) {
          legendRows++;
          // 此时需要清零重新计算累计的图例宽度
          rowReduceLegendItemWidth = 0;
        }
      });
    } else {
      legendRows = seriesNames.length;
    }
  
    const legendPaddingTopBottom = typeof legendPadding === "number"
      ? legendPadding
      : (legendPadding as number[]).length === 1
        ? legendPadding[0]
        : (legendPadding as number[]).length === 2
          ? legendPadding[0]
          : legendPadding[0] + legendPadding[2];
    
    const legendWidth = legendObj.legend.orient === "vertical"
      ? maxLongSeriesNameCount * legendFontSize + legendObj.legend.itemWidth + legendIconTextDis
      : legendNoPaddingWidth + legendPaddingLeftRight;
    const legendHeight = legendObj.legend.itemHeight * legendRows
      + legendObj.legend.itemGap * (legendRows - 1) + legendPaddingTopBottom;
    
    // legend的top与left权重大于bottom与right
    const legendOnTop = !(legendObj.legend.bottom !== undefined && legendObj.legend.top === undefined);
    const legendOnLeft = !(legendObj.legend.right !== undefined && legendObj.legend.left === undefined);
    
    /**
     * maxValue * 10是由于echarts绘画max最大值时有时候会突破取整，如99->100
     * + 0.5是为了扩大一丢丢额外空间，展示美化一下不拥挤
     */
    const lastValueItemOffset = !isVertical
      ? (exactCalcStrFontCount(convertNumToThousand(maxValue * 10)) + 0.5) * valueAxisLabelFontSize / 2
      : 0;
    
    // 自动计算的grid边界尺寸距离
    const autoCalcGridObj = {
      top: isVertical && !valueAxisInverse ? valueAxisLabelFontSize * 0.5 : 0,
      right: !isVertical && !valueAxisInverse ? lastValueItemOffset : 0,
      bottom: isVertical && valueAxisInverse ? valueAxisLabelFontSize * 0.5 : 0,
      left: !isVertical && valueAxisInverse ? lastValueItemOffset : 0,
      containLabel: true,
    };
    
    if (legendObj.legend.show !== false) {
      if (legendObj.legend.orient !== "vertical") {
        if (legendOnTop) {
          autoCalcGridObj.top += (legendHeight + offsetMargin)
        } else {
          autoCalcGridObj.bottom += (legendHeight + offsetMargin)
        }
      } else {
        if (legendOnLeft) {
          autoCalcGridObj.left += (legendWidth + offsetMargin);
        } else {
          autoCalcGridObj.right += (legendWidth + offsetMargin);
        }
      }
    }
    
    if (isVertical && (yAxisObj.yAxis as echarts.EChartOption.YAxis).name) {
      autoCalcGridObj.top += (15 + valueAxisNameFontSize - (valueAxisLabelFontSize / 2));
    }
    
    const gridObj = {
      grid: merge(autoCalcGridObj, chartOptions.grid),
    };
    
    return {
      ...chartOptions,
      ...gridObj,
      ...legendObj,
      ...xAxisObj,
      ...yAxisObj,
    };
  }
}

export * from "./model";
