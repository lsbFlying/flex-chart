<div align="center">
<h1>FlexChart</h1>

**fl**ex **ch**art

<h3>Chart with automatic boundary layout size processing (encapsulated echarts)</h3>

[![GitHub license](https://img.shields.io/github/license/lsbFlying/flex-chart?style=flat-square)](https://github.com/lsbFlying/flex-chart/blob/master/LICENSE)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/lsbFlying/flex-chart/test.yml?color=blue&style=flat-square)](https://github.com/lsbFlying/flex-chart/actions/workflows/test.yml)
[![npm type definitions](https://img.shields.io/npm/types/typescript?color=orange&style=flat-square)](https://github.com/lsbFlying/flex-chart/blob/master/src/flex-chart/index.tsx)
[![npm](https://img.shields.io/npm/v/flex-chart?color=brightgreen&style=flat-square)](https://www.npmjs.com/package/flex-chart)

</div>

---

### Install
```sh
npm i flex-chart

# yarn add flex-chart

# `echarts` is the peerDependence of `flex-chart`, you can install echarts with your own version.
npm install --save echarts
```

### Features
- Automatic processing of boundary size layout
- Automatic adjustment of component container layout size change

### Usage
```tsx
import { FlexChart } from "flex-chart";

const mockData = [
  {
    name: "ClothingClothingSalesVolume",
    data: [
      {name: "shirt", value: 50}, {name: "cardigan", value: 200},
      {name: "chiffon-shirt", value: 360}, {name: "trousers", value: 100},
      {name: "high-heeled-shoes", value: 100}, {name: "socks", value: 560},
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
      <FlexChart data={mockData}/>
    </div>
  );
}
```

### Documentation
| Property     | Description                                                      | Type                     | Default    |
|--------------|------------------------------------------------------------------|--------------------------|------------|
| autoFit      | adjust proportionally according to the page width                | boolean                  | false      |
| autoResize   | decide whether to trigger when parent component container resize | boolean                  | -          |
| barSeries    | set bar series data option             | [EChartOption.SeriesBar](./src/model/index.ts)   | -          |
| data         | data source                            | [FlexChartDataItem[]](./src/model/index.ts)      | []         |
| direction    | chart direction | "vertical"<br/>"horizontal"<br/>"verticalInverse"<br/>"horizontalInverse" | "vertical" |
| initOpts     | echarts initialization parameter configuration | [EchartsInitOpts](./src/model/index.ts)  | -          |
| initTheme    | echarts Initialization Style Theme Configuration                 | string &#124; object     | -          |
| lineSeries   | set line series data option             | [EChartOption.SeriesLine](./src/model/index.ts) | -          |
| mergeOption  | whether to merge the echarts configuration                       | boolean                  | true       |
| onChartLoad  | chart load event         | (chartsInstance: [EChartsType](./src/model/index.ts)) => void  | -          |
| onEvents     | echarts mouse event monitoring         | [FlexChartEventsType](./src/model/index.ts)      | -          |
| options      | configuration parameters of echarts                | [EChartOption](./src/model/index.ts) | -          |
| seriesTypes  | series data type               | ("bar" &#124; "line") <br/> &#124; ("bar" &#124; "line")[] | -          |
| loading      | chart???loading | boolean | false |
| loadingOption | chart???loading???????????? | [LoadingOption](./src/model/icss.ts) | [defaultLoadingOption](./src/static/index.ts) |

### License
[MIT License](https://github.com/lsbFlying/flex-chart/blob/master/LICENSE) (c) [?????????](https://github.com/lsbFlying)

