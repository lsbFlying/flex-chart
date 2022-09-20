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
 *   {name: "销量", data: [1, 2, 3]},
 *   {name: "库存", data: [4, 5, 6]},
 * ];
 */
const testData = [
  {
    name: "衣物衣物衣物衣物衣物销量",
    data: [
      {name: "衬衫", value: 50}, {name: "羊毛衫", value: 200},
      {name: "雪纺衫", value: 360}, {name: "裤子", value: 100},
      {name: "高跟鞋", value: 100}, {name: "袜子", value: 560},
    ],
  },
  {
    name: "衣物衣物衣物衣物衣物库存",
    data: [
      {name: "衬衫", value: 20}, {name: "羊毛衫", value: 90},
      {name: "雪纺衫", value: 170}, {name: "裤子", value: 30},
      {name: "高跟鞋", value: 208}, {name: "袜子", value: 120},
    ],
  },
  {
    name: "衣物衣物衣物衣物衣物破损",
    data: [
      {name: "衬衫", value: 50}, {name: "羊毛衫", value: 230},
      {name: "雪纺衫", value: 80}, {name: "裤子", value: 101},
      {name: "高跟鞋", value: 70}, {name: "袜子", value: 302},
    ],
  },
  {
    name: "衣物衣物衣物衣物衣物回退",
    data: [
      {name: "衬衫", value: 37}, {name: "羊毛衫", value: 113},
      {name: "雪纺衫", value: 59}, {name: "裤子", value: 91},
      {name: "高跟鞋", value: 34}, {name: "袜子", value: 207},
    ],
  },
];

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <FlexChart data={testData}/>
    </div>
  );
}
```

### License
[MIT License](https://github.com/lsbFlying/flex-chart/blob/master/LICENSE) (c) [刘善保](https://github.com/lsbFlying)

