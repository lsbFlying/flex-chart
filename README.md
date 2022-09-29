<div align="center">
<h1>FlexChart</h1>

**Re**act **E**charts

<h3>Chart with automatic boundary layout size processing (encapsulated echarts)</h3>

[![GitHub license](https://img.shields.io/github/license/lsbFlying/flex-chart?style=flat-square)](https://github.com/lsbFlying/flex-chart/blob/master/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/lsbFlying/flex-chart/CI?color=blue&style=flat-square)](https://github.com/lsbFlying/flex-chart/actions/workflows/test.yml)
[![npm type definitions](https://img.shields.io/npm/types/typescript?color=orange&style=flat-square)](https://github.com/lsbFlying/flex-chart/blob/master/src/flex-chart/index.tsx)
[![npm](https://img.shields.io/npm/v/flex-chart?color=blue&style=flat-square)](https://www.npmjs.com/package/flex-chart)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/flex-chart?color=brightgreen&style=flat-square)](https://bundlephobia.com/package/flex-chart)

</div>

---

### Install
```sh
npm i flex-chart

# yarn add flex-chart

# `echarts` is the peerDependence of `flex-chart`, you can install echarts with your own version.
npm install --save echarts
```

### features
- Automatic processing of boundary size layout
- Automatic adjustment of component container layout size change

### Usage
```tsx
import { FlexChart } from "flex-chart";

/**
 * @description data can be directly the value of a single dimension
 * @example
 * const testData = [
 *   {name: "salesVolume", data: [1, 2, 3]},
 *   {name: "stock", data: [4, 5, 6]},
 * ];
 */
const testData = [
  {
    name: "ClothingClothingSalesVolume",
    data: [
      {name: "衬衫", value: 50}, {name: "羊毛衫", value: 200},
      {name: "雪纺衫", value: 360}, {name: "裤子", value: 100},
      {name: "高跟鞋", value: 100}, {name: "袜子", value: 560},
    ],
  },
  {
    name: "ClothingClothingStock",
    data: [
      {name: "shirt", value: 20}, {name: "cardigan", value: 90},
      {name: "chiffon-shirt", value: 170}, {name: "trousers", value: 30},
      {name: "high-heeled-shoes", value: 208}, {name: "socks", value: 120},
    ],
  },
  {
    name: "ClothingClothingDamage",
    data: [
      {name: "shirt", value: 50}, {name: "cardigan", value: 230},
      {name: "chiffon-shirt", value: 80}, {name: "trousers", value: 101},
      {name: "high-heeled-shoes", value: 70}, {name: "socks", value: 302},
    ],
  },
  {
    name: "ClothingClothingReturn",
    data: [
      {name: "shirt", value: 37}, {name: "cardigan", value: 113},
      {name: "chiffon-shirt", value: 59}, {name: "trousers", value: 91},
      {name: "high-heeled-shoes", value: 34}, {name: "socks", value: 207},
    ],
  },
];

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <FlexChart
        data={testData}
      />
    </div>
  );
}
```

### Documentation
| Property     | Description                                                      | Type                     | Default    |
|--------------|------------------------------------------------------------------|--------------------------|------------|
| autoFit      | adjust proportionally according to the page width                | boolean                  | false      |
| autoResize   | decide whether to trigger when parent component container resize | boolean                  | -          |
| barSeries    | set bar series data option             | [EChartOption.SeriesBar](./src/flex-chart/model)   | -          |
| categoryData | category axis data                                               | (string &#124; number)[] | -          |
| data         | data source                            | [FlexChartData[]](./src/flex-chart/model)          | []         |
| direction    | chart direction | "vertical"<br/>"horizontal"<br/>"verticalInverse"<br/>"horizontalInverse" | "vertical" |
| initOpts     | echarts initialization parameter configuration | [EchartsInitOpts](./src/flex-chart/model)  | -          |
| initTheme    | echarts Initialization Style Theme Configuration                 | string &#124; object     | -          |
| lineSeries   | set line series data option             | [EChartOption.SeriesLine](./src/flex-chart/model) | -          |
| mergeOption  | whether to merge the echarts configuration                       | boolean                  | true       |
| onChartLoad  | chart load event         | (chartsInstance: [EChartsType](./src/flex-chart/model)) => void  | -          |
| onEvents     | echarts mouse event monitoring         | [FlexChartEventsType](./src/flex-chart/model)      | -          |
| options      | configuration parameters of echarts                | [EChartOption](./src/flex-chart/model) | -          |
| seriesTypes  | series data type               | ("bar" &#124; "line") <br/> &#124; ("bar" &#124; "line")[] | -          |

### License
[MIT License](https://github.com/lsbFlying/flex-chart/blob/master/LICENSE) (c) [刘善保](https://github.com/lsbFlying)

